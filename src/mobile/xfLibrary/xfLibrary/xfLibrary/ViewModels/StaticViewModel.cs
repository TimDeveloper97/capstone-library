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
        private bool isSort = true;

        public ObservableCollection<TransactionGroup> Transactions { get => transactions; set => SetProperty(ref transactions, value); }

        #endregion

        #region Command 
        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            Transactions.Add(new TransactionGroup(DateTime.Now, new[] { new Transaction
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
                }}));

            IsBusy = false;
        });

        public ICommand AppearingCommand => new Command(async () =>
        {
            IsBusy = true;

            Transactions.Add(new TransactionGroup(DateTime.Now, new[] { new Transaction
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
                }}));

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
        }
        #endregion
    }
}
