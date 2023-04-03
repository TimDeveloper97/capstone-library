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
    public partial class DetailCategoryPopup : Xamarin.CommunityToolkit.UI.Views.Popup<Category>
    {
        public DetailCategoryPopup(string token)
        {
            InitializeComponent();
            _token = token;
        }

        IMessage _message = DependencyService.Get<IMessage>();
        IMainService _mainService = DependencyService.Get<IMainService>();
        string _token;

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var cate = category.Text;

            if (string.IsNullOrEmpty(cate))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }
            var code = cate.Trim().ToLower().Replace(' ', '_');

            var res = await _mainService.AddCategoryAsync(cate, code, _token);
            if (res != null && !string.IsNullOrEmpty(res.Message))
                _message.ShortAlert(res.Message);

            okBtn.IsBusy = false;

            if (res.Success)
                Dismiss(new Category { Code = code, Name = cate });
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }
    }
}