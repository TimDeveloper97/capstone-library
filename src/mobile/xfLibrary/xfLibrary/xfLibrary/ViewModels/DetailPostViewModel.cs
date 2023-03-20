﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;
using XF.Material.Forms.UI.Dialogs;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    [QueryProperty(nameof(ParameterPost), nameof(ParameterPost))]
    class DetailPostViewModel : BaseViewModel
    {
        #region Property
        private string parameterPost;
        private ObservableCollection<string> slides;
        private List<Book> selectedBooks;
        private Post newPost;
        private bool isUpdate = false;
        int selected = -1;

        public ObservableCollection<string> Slides { get => slides; set => SetProperty(ref slides, value); }
        public Post NewPost { get => newPost; set => SetProperty(ref newPost, value); }
        public string ParameterPost
        {
            get => parameterPost;
            set
            {
                parameterPost = Uri.UnescapeDataString(value ?? string.Empty);
                SetProperty(ref parameterPost, value);

                NewPost = Newtonsoft.Json.JsonConvert.DeserializeObject<Post>(parameterPost);
                isUpdate = true;
            }
        }
        #endregion

        #region Command 
        public ICommand PageAppearingCommand => new Command(async () => {

            if (isUpdate)
            {
                Title = "Sửa thông tin bài";

                //slide image
                var order = NewPost.Order;
                if (order == null || order.Count == 0) return;

                foreach (var item in order)
                {
                    var imgs = item.Book.Imgs;

                    if (imgs != null && imgs.Count != 0)
                    {
                        foreach (var img in imgs)
                        {
                            Slides.Add(Services.Api.BaseUrl + img.FileName.Replace("\\", "/"));
                        }
                    }
                    else
                        Slides.Add(item.Book.ImageSource);
                }
            }
            else
            {
                Title = "Tạo thông tin bài";
            }
        });
        public ICommand BookCommand => new Command(async () =>
        {
            var books = await _accountService.GetAllBookAsync(_token);

            var orders = await Shell.Current.ShowPopupAsync(new OrderBookPopup(new ListBook { Books = new ObservableCollection<Book>(books) }));

            if (orders != null)
            {
                Slides.Clear();
                selectedBooks = orders.Books?.ToList();
                NewPost.Order = new ObservableCollection<Order>();

                foreach (var book in orders.Books)
                {
                    NewPost.Order.Add(new Order
                    {
                        Quantity = book.Number,
                        Book = book,
                    });

                    //slide image
                    var imgs = book.Imgs;
                    if (imgs != null && imgs.Count != 0)
                    {
                        foreach (var img in imgs)
                        {
                            Slides.Add(Services.Api.BaseUrl + img.FileName.Replace("\\", "/"));
                        }
                    }
                    else
                        Slides.Add(book.ImageSource);
                }
            }
        });
        public ICommand PostCommand => new Command(async () => {
            if(string.IsNullOrEmpty(NewPost.Address) || string.IsNullOrEmpty(NewPost.Content) 
            || NewPost.NumberOfRentalDays == 0 || NewPost.Fee == 0)
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            if (NewPost.Content.Length < 500)
            {
                _message.ShortAlert("Nội dung tối thiểu 500 chữ");
                return;
            }

            if (NewPost.Fee > 100)
            {
                _message.ShortAlert("% phí thêm phải thuộc (1,100)%");
                return;
            }

            Response res;
            if (isUpdate) res = await _mainService.UpdatePostAsync(NewPost, _token);
            else res = await _mainService.AddPostMeAsync(NewPost, _token);

            if (res.Success)
                BackCommand.Execute(null);
            _message.ShortAlert(res.Message);
        });
        public ICommand AddressCommand => new Command(async () => {
            selected = await MaterialDialog.Instance.SelectChoiceAsync(title: "Chọn nơi ký gửi", selectedIndex: selected,
                                                                         choices: Services.Api.Maps, dismissiveText: "Hủy");
            if (selected != -1) NewPost.Address = Services.Api.Maps[selected];

        });
        #endregion

        public DetailPostViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Slides = new ObservableCollection<string> { };
            NewPost = new Post();
        }
        #endregion
    }
}