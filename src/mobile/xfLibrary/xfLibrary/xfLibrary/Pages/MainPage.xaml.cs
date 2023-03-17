using BottomBar.XamarinForms;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.ViewModels;

namespace xfLibrary.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MainPage : BottomBarPage
    {
        public MainPage()
        {
            InitializeComponent();
            NavigationPage.SetHasNavigationBar(this, false);
            BindingContext = new MainViewModel();

            //var pages = Children.GetEnumerator();
            //pages.MoveNext(); // First page
            //pages.MoveNext(); // Second page
            //CurrentPage = pages.Current;
        }
    }
}