using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Models;
using xfLibrary.Services;
using xfLibrary.Services.Login;
using xfLibrary.Services.Main;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ConfigPopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        public ConfigPopup(List<Config> configs, string token)
        {
            InitializeComponent();
            _token = token;
            _configs = configs;

            if (configs != null && configs.Count != 0)
            {
                discount.Text = configs[0].Value.ToString();
                days.Text = configs[1].Value.ToString();
            }
        }

        IMessage _message = DependencyService.Get<IMessage>();
        IAccountService _accountService = DependencyService.Get<IAccountService>();
        List<Config> _configs;
        string _token;

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var dis = discount.Text;
            var day = days.Text;

            if (string.IsNullOrEmpty(dis) || string.IsNullOrEmpty(day))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            if (_configs == null || _configs.Count == 0)
            {
                okBtn.IsBusy = false;
                return;
            }

            await UpdateConfig(_configs[0], dis);
            await UpdateConfig(_configs[1], day);

            okBtn.IsBusy = false;
            Dismiss(null);
        }

        async Task UpdateConfig(Config _old, string _new)
        {
            if (_new != _old.Value.ToString())
            {
                var res = await _accountService.UpdateConfigAsync(new { key = _old.Key, value = _new }, _token);

                if (res != null && !string.IsNullOrEmpty(res.Message))
                    _message.ShortAlert(res.Message);
            }
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }
    }
}