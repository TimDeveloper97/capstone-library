using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class NewsViewModel : BaseViewModel
    {
        #region Properties
        private string text;
        private ObservableCollection<A> news;
        private int maxLines;

        public ObservableCollection<A> News { get => news; set => SetProperty(ref news, value); }
        public string Text { get => text; set => SetProperty(ref text, value); }

        #endregion

        #region Command 
        public ICommand ExtendTextCommand => new Command<A>((a) =>
        {
            if (a.MaxLines == 3)
                a.MaxLines = 99;
            else
                a.MaxLines = 3;

        });

        #endregion

        public NewsViewModel()
        {
            ExecuteLoadMessagingCenter();
            Init();
        }


        void ExecuteLoadMessagingCenter()
        {
            MessagingCenter.Subscribe<object, string>(this, "Hi",
                  (sender, arg) =>
                  {
                      Text = arg;
                  });
        }

        void Init()
        {
            News = new ObservableCollection<A>
            {
                new A
                {
                    MaxLines = 3,
                    Text = "Một hôm Main gặp tai nạn > xuyên không về 1 thế giới Murim và thấy mình được sinh ra với hình hài một đứa bé đạo sĩ! " +
                "Có một thời tôi ở cửu phái nhất môn, nhưng bây giờ thì ở Chung Nam phái, một môn phái đang dần trở nên yếu thế." +
                "Tôi được đặt tên là 'Geon Chung', dùng những kiến thức của kiếp để ngộ ra đạo lý võ công và tiến bộ thần tốc.",
                    Slide = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", }
                },

                new A
                {
                    MaxLines = 3,
                    Text = "Một hôm Main gặp tai nạn > xuyên không về 1 thế giới Murim và thấy mình được sinh ra với hình hài một đứa bé đạo sĩ! " +
                "Có một thời tôi ở cửu phái nhất môn, nhưng bây giờ thì ở Chung Nam phái, một môn phái đang dần trở nên yếu thế." +
                "Tôi được đặt tên là 'Geon Chung', dùng những kiến thức của kiếp để ngộ ra đạo lý võ công và tiến bộ thần tốc.",
                    Slide = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", }
                },
            };
            IsBusy = true;
        }

        public class A : BaseBinding
        {
            private string text;
            private int maxLines;
            private ObservableCollection<string> slide;

            public string Text { get => text; set => SetProperty(ref text, value); }
            public ObservableCollection<string> Slide { get => slide; set => SetProperty(ref slide, value); }
            public int MaxLines { get => maxLines; set => SetProperty(ref maxLines, value); }

        }
    }
}
