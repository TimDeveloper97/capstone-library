using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Pages;
using xfLibrary.Pages.Popup;

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
            //DependencyService.Register<Services.Temp.SomeService>();
            //DependencyService.Register<Services.MainService>();
            
        }

        void InitRoute()
        {
            Routing.RegisterRoute(nameof(LoginView), typeof(LoginView));
            Routing.RegisterRoute(nameof(ChatView), typeof(ChatView));
            Routing.RegisterRoute(nameof(AddReportView), typeof(AddReportView));
            Routing.RegisterRoute(nameof(ChatDetailView), typeof(ChatDetailView));
            Routing.RegisterRoute(nameof(RegisterView), typeof(RegisterView));
            Routing.RegisterRoute(nameof(OrderView), typeof(OrderView));
            Routing.RegisterRoute(nameof(TransactionPopup), typeof(TransactionPopup));
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