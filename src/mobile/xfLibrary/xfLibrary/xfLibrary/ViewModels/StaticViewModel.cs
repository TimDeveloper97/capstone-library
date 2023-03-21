using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

        public ObservableCollection<TransactionGroup> Transactions { get => transactions; set => SetProperty(ref transactions, value); }

        #endregion

        #region Command 
        public ICommand ReloadTransactionCommand => new Command(() =>
        {
            IsBusy = true;
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
            Transactions = new ObservableCollection<TransactionGroup> {
                new TransactionGroup(DateTime.Now, new[] { new Transaction
                {
                    Date = DateTime.Now,
                    Money = 1000000,
                    User = "sơn",
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                },
                new Transaction
                {
                    Date = DateTime.Now,
                    Money = 1000000,
                    User = "sơn",
                    Message = "ngày hôm nay",
                }}),

                new TransactionGroup(DateTime.Now.AddDays(-1), new[] { new Transaction
                {
                    Date = DateTime.Now.AddDays(-1),
                    Money = 1000000,
                    User = "sơn",
                    Message = "ngày hôm qua",
                },
                new Transaction
                {
                    Date = DateTime.Now.AddDays(-1),
                    Money = 1000000,
                    User = "sơn",
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                }}),

                new TransactionGroup(DateTime.Now.AddDays(-2), new[] { new Transaction
                {
                    Date = DateTime.Now.AddDays(-2),
                    Money = 1000000,
                    User = "sơn",
                    Message = "ngày hôm kia",
                },
                new Transaction
                {
                    Date = DateTime.Now.AddDays(-2),
                    Money = 1000000,
                    User = "sơn",
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                }}),
            };
            IsBusy = false;
        }
        #endregion
    }
}
