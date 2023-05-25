using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Models;

namespace xfLibrary.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SearchBarSuggestionView : ContentView
    {
        public SearchBarSuggestionView()
        {
            InitializeComponent();
        }

        public static readonly BindableProperty IsSearchingProperty =
        BindableProperty.Create("IsSearching", typeof(bool), typeof(SearchBarSuggestionView), false);

        public bool IsSearching
        {
            get { return (bool)GetValue(IsSearchingProperty); }
            set { SetValue(IsSearchingProperty, value); }
        }

        public static readonly BindableProperty ItemsSourceProperty =
                BindableProperty.Create("ItemsSource", typeof(ObservableCollection<Book>), typeof(SearchBarSuggestionView));

        public ObservableCollection<Book> ItemsSource
        {
            get { return (ObservableCollection<Book>)GetValue(ItemsSourceProperty); }
            set { SetValue(ItemsSourceProperty, value); }
        }

        public static readonly BindableProperty SelectItemProperty =
        BindableProperty.Create("SelectItem", typeof(Book), typeof(SearchBarSuggestionView), default(Book));

        public Book SelectItem
        {
            get { return (Book)GetValue(SelectItemProperty); }
            set { SetValue(SelectItemProperty, value); }
        }

        public static readonly BindableProperty SelectedCommandProperty =
            BindableProperty.Create(nameof(SelectedCommand), typeof(ICommand), typeof(SearchBarSuggestionView), null);
        public ICommand SelectedCommand
        {
            get => (ICommand)GetValue(SelectedCommandProperty);
            set => SetValue(SelectedCommandProperty, value);
        }

        public static readonly BindableProperty SelectedCommandParameterProperty =
            BindableProperty.Create(nameof(SelectedCommandParameter), typeof(Book), typeof(SearchBarSuggestionView), default(Book));
        public Book SelectedCommandParameter
        {
            get => (Book)GetValue(SelectedCommandParameterProperty);
            set => SetValue(SelectedCommandParameterProperty, value);
        }
    }
}