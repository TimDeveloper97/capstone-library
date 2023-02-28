using ChatApp.Models;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Services;

namespace xfLibrary.ViewModels
{
    public class DetailViewModel : BaseViewModel
    {
        User _user;
        ObservableCollection<Message> _messages;

        public User User
        {
            get { return _user; }
            set
            {
                SetProperty(ref _user, value);    
            }
        }

        public ObservableCollection<Message> Messages
        {
            get { return _messages; }
            set
            {
                SetProperty(ref _messages, value);
            }
        }

        public DetailViewModel()
        {
            ExecuteLoadMessagingCenter();
            User = MessageService.Instance.GetUsers().FirstOrDefault();
            Messages = new ObservableCollection<Message>(MessageService.Instance.GetMessages(User));
        }

        void ExecuteLoadMessagingCenter()
        {
            //MessagingCenter.Subscribe<object, object>(this, "parameter",
            //      (sender, arg) =>
            //      {
                      
            //      });
        }

        //public ICommand BackCommand => new Command(OnBack);

        //public override Task InitializeAsync(object navigationData)
        //{
        //    if (navigationData is Message message)
        //    {
        //        
        //    }

        //    return base.InitializeAsync(navigationData);
        //}

        //async void OnBack()
        //{
        //    await NavigationService.Instance.NavigateBackAsync();
        //}
    }
}