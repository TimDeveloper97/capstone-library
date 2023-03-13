using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace xfLibrary.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FieldLabel : ContentView
    {
        public FieldLabel()
        {
            InitializeComponent();
        }

        public static readonly BindableProperty TextProperty =
        BindableProperty.Create("Text", typeof(string), typeof(FieldLabel), default(string));

        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        public static readonly BindableProperty TitleProperty =
        BindableProperty.Create("Title", typeof(string), typeof(FieldLabel), default(string));

        public string Title
        {
            get { return (string)GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }
    }
}