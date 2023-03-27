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
            Routing.RegisterRoute(nameof(OrderView), typeof(OrderView));
            Routing.RegisterRoute(nameof(IpPopup), typeof(IpPopup));
            Routing.RegisterRoute(nameof(StaticView), typeof(StaticView));
            Routing.RegisterRoute(nameof(ProfilePopup), typeof(ProfilePopup));
            Routing.RegisterRoute(nameof(TransactionPopup), typeof(TransactionPopup));
            Routing.RegisterRoute(nameof(InformationPaymenPopup), typeof(InformationPaymenPopup));
            Routing.RegisterRoute(nameof(ForgotPasswordPopup), typeof(ForgotPasswordPopup));
            Routing.RegisterRoute(nameof(ChangePasswordPopup), typeof(ChangePasswordPopup));
        }
    }
}