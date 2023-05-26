using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Models;
using xfLibrary.Services;
using xfLibrary.Services.Main;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FeedbackPopup : Xamarin.CommunityToolkit.UI.Views.Popup<bool>
    {
        protected IMessage _message = DependencyService.Get<IMessage>();
        protected IMainService _mainService = DependencyService.Get<IMainService>();
        Post _post;
        string _token;

        public FeedbackPopup(Post post, string token)
        {
            InitializeComponent();
            _post = post;
            _token = token;
        }

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var title = this.title.Text;
            var description = this.description.Text;

            if (string.IsNullOrEmpty(description))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            //2. Lúc manager hủy đơn ký gửi và đơn hàng, cho nó cái field ghi lí do r gửi cho customer, gửi vô notification.
            var res = await _mainService.DenyPostAsync(_post.Id, _token);
            _message.ShortAlert(res?.Message ?? "Không có phản hồi");

            if (res.Success)
                Dismiss(true);

            okBtn.IsBusy = false;
            Dismiss(false);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(false);
        }
    }
}