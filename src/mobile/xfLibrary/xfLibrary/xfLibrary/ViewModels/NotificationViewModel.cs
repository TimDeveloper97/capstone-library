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
        public ICommand ReloadNotificationCommand => new Command(() =>
        {
            IsBusy = true;
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
            Notifications = new ObservableCollection<NotificationGroup> {
                new NotificationGroup(DateTime.Now, new[] { new Notification
                {
                    Date = DateTime.Now,
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                    Color = "#00ff00",
                },
                new Notification
                {
                    Date = DateTime.Now,
                    Message = "ngày hôm nay",
                    Color = "#00ff00",
                }}),

                new NotificationGroup(DateTime.Now.AddDays(-1), new[] { new Notification
                {
                    Date = DateTime.Now.AddDays(-1),
                    Message = "ngày hôm qua",
                    Color = "#3333cc",
                },
                new Notification
                {
                    Date = DateTime.Now.AddDays(-1),
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                    Color = "#3333cc",
                }}),

                new NotificationGroup(DateTime.Now.AddDays(-2), new[] { new Notification
                {
                    Date = DateTime.Now.AddDays(-2),
                    Message = "ngày hôm kia",
                    Color = "#ff6600",
                },
                new Notification
                {
                    Date = DateTime.Now.AddDays(-2),
                    Message = "Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện.Ôn tập đạo hàm 11 là một trong những mục tiêu quan trọng mà các em học sinh cần thực hiện",
                    Color = "#ff6600",
                }}),
            };
            IsBusy = true;
        }
        #endregion
    }
}
