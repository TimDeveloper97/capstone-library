using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages;

namespace xfLibrary.ViewModels
{
    class ReportViewModel : BaseViewModel
    {
        #region Properties
        private ObservableCollection<Post> posts;

        public ObservableCollection<Post> Posts { get => posts; set => SetProperty(ref posts, value); }
        #endregion

        #region Command 
        public ICommand ExtendTextCommand => new Command<A>((a) =>
        {
            if (a.MaxLines == 3)
                a.MaxLines = 99;
            else
                a.MaxLines = 3;
        });

        public ICommand ReloadNewsCommand => new Command(() =>
        {
            IsBusy = true;

            IsBusy = false;
        });

        public ICommand MessagerCommand => new Command<A>(async (a) =>
        {
            await Shell.Current.GoToAsync(nameof(ChatView));
        });

        #endregion

        public ReportViewModel()
        {
            Init();
        }

        void Init()
        {
            Posts = new ObservableCollection<Post>();

            //foreach (var item in News)
            //{
            //    item.Height = item.Slide.Count == 0 ? 0 : 150;
            //}
            IsBusy = true;

        }
    }
}
