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
    class NotificationViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<NotificationGroup> notifications;

        public ObservableCollection<NotificationGroup> Notifications { get => notifications; set => SetProperty(ref notifications, value); }

        #endregion

        #region Command 
        public ICommand RefreshCommand => new Command(() =>
        {
            IsBusy = true;
            Notifications.Add(
                new NotificationGroup(DateTime.Now, new[] { new Notification
                {
                    Date = DateTime.Now,
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                },
                new Notification
                {
                    Date = DateTime.Now,
                    Message = "ngày hôm nay",
                }}));

            Notifications.Add(new NotificationGroup(DateTime.Now.AddDays(-1), new[] { new Notification
                {
                    Date = DateTime.Now.AddDays(-1),
                    Message = "ngày hôm qua",
                },
                new Notification
                {
                    Date = DateTime.Now.AddDays(-1),
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                }}));

            Notifications.Add(new NotificationGroup(DateTime.Now.AddDays(-2), new[] { new Notification
                {
                    Date = DateTime.Now.AddDays(-2),
                    Message = "ngày hôm kia",
                },
                new Notification
                {
                    Date = DateTime.Now.AddDays(-2),
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                }}));
            
            IsBusy = false;
        });

        public ICommand ExtendTextCommand => new Command<Notification>((noti) =>
        {
            if (noti.MaxLines == 1)
                noti.MaxLines = 99;
            else
                noti.MaxLines = 1;
        });
        #endregion

        public NotificationViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Notifications = new ObservableCollection<NotificationGroup>();
        }
        #endregion
    }
}
