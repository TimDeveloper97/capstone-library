using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Pages;
using xfLibrary.Pages.Popup;
using xfLibrary.Services.Account;
using xfLibrary.Services.Main;

namespace xfLibrary
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MobileShell : Shell
    {
        public MobileShell()
        {
            InitializeComponent();

            InitDependencyService();
            InitRoute();
        }

        void InitDependencyService()
        {
            //await CheckAndRequestPermission();
            DependencyService.Register<AccountService>();
            DependencyService.Register<MainService>();
        }

        void InitRoute()
        {
            Routing.RegisterRoute(nameof(LoginView), typeof(LoginView));
            Routing.RegisterRoute(nameof(ChatView), typeof(ChatView));
            Routing.RegisterRoute(nameof(FeedbackPopup), typeof(FeedbackPopup));
            Routing.RegisterRoute(nameof(DetailPostView), typeof(DetailPostView));
            Routing.RegisterRoute(nameof(BookView), typeof(BookView));
            Routing.RegisterRoute(nameof(DetailBookView), typeof(DetailBookView));
            Routing.RegisterRoute(nameof(ChatDetailView), typeof(ChatDetailView));
            Routing.RegisterRoute(nameof(RegisterView), typeof(RegisterView));
            Routing.RegisterRoute(nameof(CartView), typeof(CartView));
            Routing.RegisterRoute(nameof(ProfilePopup), typeof(ProfilePopup));
            Routing.RegisterRoute(nameof(TransactionPopup), typeof(TransactionPopup));
            Routing.RegisterRoute(nameof(ForgotPasswordPopup), typeof(ForgotPasswordPopup));
            Routing.RegisterRoute(nameof(ChangePasswordPopup), typeof(ChangePasswordPopup));
        }

        //public async Task<PermissionStatus> CheckAndRequestPermission()
        //{
        //    var status = await Permissions.CheckStatusAsync<Permissions.Sms>();

        //    if (status == PermissionStatus.Granted)
        //        return status;

        //    if (status == PermissionStatus.Denied && DeviceInfo.Platform == DevicePlatform.iOS)
        //    {
        //        // Prompt the user to turn on in settings
        //        // On iOS once a permission has been denied it may not be requested again from the application
        //        return status;
        //    }

        //    if (Permissions.ShouldShowRationale<Permissions.Sms>())
        //    {
        //        // Prompt the user with additional information as to why the permission is needed
        //    }

        //    status = await Permissions.RequestAsync<Permissions.Sms>();

        //    return status;
        //}
    }
}