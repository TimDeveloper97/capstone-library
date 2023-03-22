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
                lsort = new ObservableCollection<Goods>(Goodss.OrderBy(x => x.ReturnDate ?? DateTime.MinValue.Ticks));

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
            await Shell.Current.ShowPopupAsync(new DetailPostPopup(post, true));

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
                    ReturnDate = new DateTime(2023, 3, 21).Ticks,
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
            var s = new DateTime(good.ReturnDate ?? DateTime.MinValue.Ticks) - new DateTime(good.CreateDate ?? DateTime.MinValue.Ticks);
            good.Day = (int)s.TotalDays;

            //update color status
            good.Color = Resources.ExtentionHelper.StatusToColor(good.Status);
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
