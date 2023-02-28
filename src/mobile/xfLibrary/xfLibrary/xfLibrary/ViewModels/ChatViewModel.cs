using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Pages;
using xfLibrary.Services;

namespace xfLibrary.ViewModels
{
    public class ChatViewModel : BaseViewModel
    {
        ObservableCollection<User> _users;
        ObservableCollection<Message> _recentChat;

        public ChatViewModel()
        {
            LoadData();
        }

        public ObservableCollection<User> Users
        {
            get { return _users; }
            set
            {
                SetProperty(ref _users, value);
            }
        }

        public ObservableCollection<Message> RecentChat
        {
            get { return _recentChat; }
            set
            {
                SetProperty(ref _recentChat, value);
            }
        }

        public ICommand DetailCommand => new Command<object>(OnNavigate);

        void LoadData()
        {
            Users = new ObservableCollection<User>(MessageService.Instance.GetUsers());
            RecentChat = new ObservableCollection<Message>(MessageService.Instance.GetChats());
        }

        async void OnNavigate(object parameter)
        {
            MessagingCenter.Send<object, object>(this, "parameter", parameter);
            await Shell.Current.GoToAsync(nameof(DetailView));
        }
    }
}
