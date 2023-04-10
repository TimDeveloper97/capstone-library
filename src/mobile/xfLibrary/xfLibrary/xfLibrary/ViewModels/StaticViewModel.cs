using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.ViewModels
{
    class StaticViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<TransactionGroup> transactions;
        private List<TransactionGroup> _list;
        private string[] groups;
        private string selectedItem;
        DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public ObservableCollection<TransactionGroup> Transactions { get => transactions; set => SetProperty(ref transactions, value); }
        public string[] Groups { get => groups; set => SetProperty(ref groups, value); }
        public string SelectedItem { get => selectedItem; set => SetProperty(ref selectedItem, value); }

        #endregion

        #region Command 
        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            var trans = await _mainService.TransactionAsync(_token);

            _list.Clear();
            Transactions.Clear();
            UpdateDataItem(trans);

            IsBusy = false;
        });

        public ICommand GroupCommand => new Command(async () =>
        {
            Transactions.Clear();
            //all
            if (SelectedItem == groups[0])
            {
                foreach (var item in _list)
                    Transactions.Add(item);
            }
            //tiền vào
            else if (SelectedItem == groups[1])
            {
                foreach (var group in _list)
                {
                    var res = group.Where(x => x.Money > 0).ToList();
                    if (res != null && res.Count != 0)
                        Transactions.Add(new TransactionGroup(group.Date, res));
                }
            }
            //tiền ra
            else
            {
                foreach (var group in _list)
                {
                    var res = group.Where(x => x.Money < 0).ToList();
                    if (res != null && res.Count != 0)
                        Transactions.Add(new TransactionGroup(group.Date, res));
                }
            }
        });

        public ICommand ExtendTextCommand => new Command<Transaction>((noti) =>
        {
            if (noti.MaxLines == 1)
                noti.MaxLines = 99;
            else
                noti.MaxLines = 1;
        });
        #endregion

        public StaticViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Transactions = new ObservableCollection<TransactionGroup>();
            _list = new List<TransactionGroup>();
            Groups = new string[] { "Tất cả", "Tiền nạp", "Tiền rút" };
            IsBusy = true;
        }
        void UpdateDataItem(List<Transaction> trans)
        {
            if (trans != null)
            {
                trans = trans.Where(x => { x.Date = start.AddMilliseconds(x.CreatedDate).ToLocalTime(); return true; }).ToList();
                var groups = trans.GroupBy(x => x.Date.Date).OrderByDescending(x => x.Key).ToList();

                foreach (var group in groups)
                {
                    var item = new TransactionGroup(group.Key, group.OrderByDescending(x => x.Date).ToList());

                    _list.Add(item);
                    Transactions.Add(item);
                }
            }
        }
        #endregion
    }
}
