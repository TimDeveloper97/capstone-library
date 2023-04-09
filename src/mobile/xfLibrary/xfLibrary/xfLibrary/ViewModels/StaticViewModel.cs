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
        DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public ObservableCollection<TransactionGroup> Transactions { get => transactions; set => SetProperty(ref transactions, value); }
        public string[] Groups { get => groups; set => SetProperty(ref groups, value); }

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

        public ICommand GroupCommand => new Command<int>(async (index) =>
        {
            IsBusy = true;

            Transactions.Clear();
            //all
            if (index == 0)
            {
                foreach (var item in _list)
                    Transactions.Add(item);
            }    
            //tiền vào
            else if(index == 1)
            {
                var res = _list.Where(x => x.Any(y => y.Message.Contains("nạp"))).ToList();
                foreach (var item in res)
                    Transactions.Add(item);
            }   
            //tiền ra
            else
            {
                var res = _list.Where(x => x.Any(y => y.Message.Contains("rút"))).ToList();
                foreach (var item in res)
                    Transactions.Add(item);
            }    

            IsBusy = false;
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
            Groups = new string[] { "Tất cả", "Tiền vào", "Tiền ra" };
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
