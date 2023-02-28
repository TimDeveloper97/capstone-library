using Xamarin.Forms;

namespace xfLibrary.Views.Templates
{
    public partial class SuggestedItemTemplate : ContentView
    {
        public SuggestedItemTemplate()
        {
            InitializeComponent();
        }

        public static readonly BindableProperty ColorProperty =
            BindableProperty.Create("Color", typeof(Color), typeof(SuggestedItemTemplate), default(Color));

        public Color Color
        {
            get { return (Color)GetValue(ColorProperty); }
            set { SetValue(ColorProperty, value); }
        }

        public static readonly BindableProperty ImageProperty =
            BindableProperty.Create("Image", typeof(string), typeof(SuggestedItemTemplate), default(string));

        public string Image
        {
            get { return (string)GetValue(ImageProperty); }
            set { SetValue(ImageProperty, value); }
        }
    }
}