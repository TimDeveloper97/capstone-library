using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace xfLibrary.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class HeaderView : ContentView
    {
        public HeaderView()
        {
            InitializeComponent();
        }

        public static readonly BindableProperty TextProperty =
        BindableProperty.Create("Text", typeof(string), typeof(HeaderView), default(string));

        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        public static readonly BindableProperty SearchCommandProperty =
            BindableProperty.Create(nameof(SearchCommand), typeof(ICommand), typeof(HeaderView), null);
        public ICommand SearchCommand
        {
            get => (ICommand)GetValue(SearchCommandProperty);
            set => SetValue(SearchCommandProperty, value);
        }

        public static readonly BindableProperty SearchCommandParameterProperty =
            BindableProperty.Create(nameof(SearchCommandParameter), typeof(object), typeof(HeaderView), null);
        public object SearchCommandParameter
        {
            get => (object)GetValue(SearchCommandParameterProperty);
            set => SetValue(SearchCommandParameterProperty, value);
        }

        public static readonly BindableProperty TextChangedCommandProperty =
        BindableProperty.Create(nameof(TextChangedCommand), typeof(ICommand), typeof(HeaderView));

        public ICommand TextChangedCommand
        {
            get => (ICommand)GetValue(TextChangedCommandProperty);
            set => SetValue(TextChangedCommandProperty, (object)value);
        }

        private void SearchBar_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (this.TextChangedCommand == null ||
             !this.TextChangedCommand.CanExecute(this.Text))
                return;

            this.TextChangedCommand.Execute(this.Text);
        }
    }
}