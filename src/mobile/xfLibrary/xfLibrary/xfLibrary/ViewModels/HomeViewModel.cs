﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class HomeViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> suggests, recentUpdates;
        private string widthCard, currentItem;

        public ObservableCollection<string> Suggests { get => suggests; set => SetProperty(ref suggests, value); }
        public ObservableCollection<string> RecentUpdates { get => recentUpdates; set => SetProperty(ref recentUpdates, value); }
        public string WidthCard { get => widthCard; set => SetProperty(ref widthCard, value); }
        public string CurrentItem { get => currentItem; set => SetProperty(ref currentItem, value); }

        #endregion

        #region Command 
        public ICommand PageAppearingCommand => new Command(() =>
        {
            Init();
        });

        public ICommand MenuCommand => new Command(() => Shell.Current.FlyoutIsPresented = true);
        #endregion

        public HomeViewModel()
        {
        }

        #region Method
        void Init()
        {
            Suggests = new ObservableCollection<string>();
            RecentUpdates = new ObservableCollection<string>();
            for (int i = 0; i < 5; i++)
            {
                Suggests.Add("language.png");
            }
            CurrentItem = Suggests.Skip(1).FirstOrDefault();
        }

        void ExecuteLoadDeviceCommand()
        {

        }
        #endregion
    }
}
