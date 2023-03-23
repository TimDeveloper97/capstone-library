using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class OrderViewModel : BaseViewModel
    {
        #region Properties
        private ObservableCollection<Goods> goodss;
        DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        private bool isSort = true;

        public ObservableCollection<Goods> Goodss { get => goodss; set => SetProperty(ref goodss, value); }
        #endregion

        #region Command 

        public ICommand FilterCommand => new Command(async () =>
        {
            IsBusy = true;

            ObservableCollection<Goods> lsort = null;
            if (isSort)
                lsort = new ObservableCollection<Goods>(Goodss.OrderBy(x => x.Status));
            else
                lsort = new ObservableCollection<Goods>(Goodss.OrderBy(x => x.NumberOfRentalDays));

            isSort = !isSort;
            Goodss = lsort;
            IsBusy = false;
        });

        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            await AddOrder();

            IsBusy = false;
        });

        public ICommand ViewCommand => new Command<Goods>(async (good) =>
        {
            IsBusy = true;

            var post = await _mainService.GetPostAsync(good.PostId, _token);
            if (post != null)
                await Shell.Current.ShowPopupAsync(new DetailPostPopup(post, true));

            IsBusy = false;
        });

        public ICommand AcceptCommand => new Command<Goods>(async (good) =>
        {
            IsBusy = true;

            //lấy sách
            if(good.Status == Services.Api.USER_PAYMENT_SUCCESS)
            {

            }   
            //trả sách
            else if(good.Status == Services.Api.USER_RETURN_IS_NOT_APPROVED)
            {

            }    

            IsBusy = false;
        });
        #endregion

        public OrderViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Goodss = new ObservableCollection<Goods>();
            //FakeData();
        }

        void FakeData()
        {
            var l = new List<Goods>();
            for (int i = 0; i < 2; i++)
            {
                l.Add(new Goods
                {
                    CreateDate = new DateTime(2023, 3, 3).Ticks,
                    PostId = i.ToString(),
                    Status = 2 * (i + 1),
                    Total = 6000000,
                    User = "Duy Anh"
                });
            }

            foreach (var item in l)
            {
                Goodss.Add(UpdateItemData(item));
            }
        }

        Goods UpdateItemData(Goods good)
        {
            //count day remain
            DateTime date = start.AddMilliseconds(good.CreateDate ?? DateTime.MinValue.Ticks).ToLocalTime();

            var s = date.AddDays(good.NumberOfRentalDays);
            good.ReturnDate = s;

            //update color status
            good.Color = Resources.ExtentionHelper.StatusToColor(good.Status);

            //isadmin
            good.IsAdmin = _isAdmin;

            //takebook
            var daybuy = (int)(DateTime.Now - date).TotalDays;
            if (good.Status == Services.Api.USER_PAYMENT_SUCCESS)
            {
                if (daybuy >= 0 && daybuy <= 3)
                    good.Message = $"Bạn còn lại {3 - daybuy} ngày để lấy sách trước khi quá hạn.";
                else if (daybuy > 3)
                    good.Message = $"Bạn đã quá hạn lấy sách {3 - daybuy} ngày.";
            }

            //dayleft
            var dayleft = (int)(good.ReturnDate - DateTime.Now).TotalDays;
            if (good.Status == Services.Api.USER_RETURN_IS_NOT_APPROVED)
            {
                if (dayleft >= 0 && dayleft <= 7)
                    good.Message = $"Bạn còn lại {dayleft} ngày để trả sách trước khi quá hạn.";
                else if (dayleft < 0)
                    good.Message = $"Bạn đã quá hạn trả sách {dayleft} ngày.";
            }

            return good;
        }

        async Task AddOrder()
        {
            var orders = await _mainService.GetAllGoodsAsync(_token);

            Goodss.Clear();
            if (orders == null) { IsBusy = false; return; }
            foreach (var order in orders)
            {
                Goodss.Add(UpdateItemData(order));
            }
        }
        #endregion
    }
}
