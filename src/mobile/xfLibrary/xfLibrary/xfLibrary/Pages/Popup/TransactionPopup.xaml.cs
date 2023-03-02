using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class TransactionPopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        public TransactionPopup(string un)
        {
            InitializeComponent();

            username.Text = un;
        }
    }
}