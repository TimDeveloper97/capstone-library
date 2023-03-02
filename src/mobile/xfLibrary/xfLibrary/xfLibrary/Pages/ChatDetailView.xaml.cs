using Xamarin.Forms;
using xfLibrary.ViewModels;

namespace xfLibrary.Pages
{
    public partial class ChatDetailView : ContentPage
    {
        public ChatDetailView()
        {
            InitializeComponent();

            BindingContext = new ChatDetailViewModel();
        }
    }
}