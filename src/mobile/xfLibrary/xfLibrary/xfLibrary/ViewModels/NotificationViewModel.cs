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
    class NotificationViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<NotificationGroup> notifications;
        DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public ObservableCollection<NotificationGroup> Notifications { get => notifications; set => SetProperty(ref notifications, value); }
        #endregion

        #region Command 
        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            var notis = await _mainService.NotificationAsync(_token);
            
            Notifications.Clear();
            UpdateDataItem(notis);

            IsBusy = false;
        });

        public ICommand ExtendTextCommand => new Command<Notification>(async (noti) =>
        {
            if (noti.MaxLines == 1)
                noti.MaxLines = 99;
            else
                noti.MaxLines = 1;

            if(noti.Status == 0)
            {
                await _mainService.ChangeStatusNotificationAsync(noti.Id, _token);
                noti.Status = 1;
            }    
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
           
            MessagingCenter.Subscribe<object, object>(this, "notification",
                 (sender, arg) =>
                 {
                     IsBusy = true;
                 });
        }

        void UpdateDataItem(List<Notification> notis)
        {
            if (notis != null)
            {
                notis = notis.Where(x => { x.Date = start.AddMilliseconds(x.CreatedDate).ToLocalTime(); return true; }).ToList();
                var groups = notis.GroupBy(x => x.Date.Date).OrderByDescending(x => x.Key).ToList();

                foreach (var group in groups)
                    Notifications.Add(new NotificationGroup(group.Key, group.ToList()));
            }
        }
        #endregion
    }
}
