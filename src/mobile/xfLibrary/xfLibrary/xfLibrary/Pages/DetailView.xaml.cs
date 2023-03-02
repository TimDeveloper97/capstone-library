using Xamarin.Forms;
using xfLibrary.ViewModels;

namespace xfLibrary.Pages
{
    public partial class DetailView : ContentPage
    {
        public DetailView()
        {
            InitializeComponent();

            BindingContext = new DetailViewModel();
        }
    }
}