using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Services;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FeedbackPopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        protected IMessage _message = DependencyService.Get<IMessage>();
        public FeedbackPopup()
        {
            InitializeComponent();
        }

        private void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var title = this.title.Text;
            var description = this.description.Text;

            if (string.IsNullOrEmpty(title) || string.IsNullOrEmpty(description))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            okBtn.IsBusy = false;
            Dismiss(null);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }
    }
}