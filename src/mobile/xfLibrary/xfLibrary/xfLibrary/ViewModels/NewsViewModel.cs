using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class NewsViewModel : BaseViewModel
    {
        #region Properties
        private string text;

        public string Text { get => text; set => SetProperty(ref text, value); }

        #endregion
        public NewsViewModel()
        {
            ExecuteLoadMessagingCenter();
        }


        void ExecuteLoadMessagingCenter()
        {
            MessagingCenter.Subscribe<object, string>(this, "Hi",
                  (sender, arg) =>
                  {
                      Text = arg;
                  });
        }
    }
}
