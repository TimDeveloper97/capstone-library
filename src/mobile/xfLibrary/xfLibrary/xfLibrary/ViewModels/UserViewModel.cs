using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.ViewModels
{
    class UserViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<User> user;
        private List<User> _users;
        private bool isSort = true;

        public ObservableCollection<User> Users { get => user; set => SetProperty(ref user, value); }
        #endregion

        #region Command 
        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            if (_users == null || _users?.Count == 0)
                _users = await _accountService.GetAllUserAsync(_token);

            await AddUser();

            IsBusy = false;
        });

        public ICommand FilterCommand => new Command(() =>
        {
            IsBusy = true;

            ObservableCollection<User> lsort = null;
            if (isSort)
                lsort = new ObservableCollection<User>(Users.OrderBy(x => x.Name));
            else
                lsort = new ObservableCollection<User>(Users.OrderByDescending(x => x.Name));

            isSort = !isSort;
            Users = lsort;
            IsBusy = false;
        });

        public ICommand DisableCommand => new Command<User>(async (u) =>
        {
            var status = 0;
            if (u.Status == Services.Api.ACTIVATE)
                status = Services.Api.DISABLE;
            else
                status = Services.Api.ACTIVATE;

            var res = await _accountService.UpdateRoleAsync(u.Id, new { id = u.Id, status = status, roles = _user.Roles }, _token);
            if (res == null) return;

            if (res.Success)
                u.Status = status;

            if (string.IsNullOrEmpty(res.Message))
                _message.ShortAlert(res.Message);
        });

        public ICommand UpdateCommand => new Command<User>(async (u) =>
        {
            string[] roles = null;
            if (u.Level == Services.Api.USER)
                roles = Services.Api.MANAGER_ROLES;
            else 
                roles = Services.Api.USER_ROLES;

            var res = await _accountService.UpdateRoleAsync(u.Id, new { id = u.Id, status = u.Status, roles = roles }, _token);
            if (res == null) return;

            if (res.Success)
            {
                u.Roles = roles;
                u.Level = Resources.ExtentionHelper.StringToRole(roles);
            }    

            if (string.IsNullOrEmpty(res.Message))
                _message.ShortAlert(res.Message);
        });

        #endregion

        public UserViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Users = new ObservableCollection<User>();
        }

        async Task AddUser()
        {
            var us = await _accountService.GetAllUserAsync(_token);

            Users.Clear();
            if (us == null) { IsBusy = false; return; }
            foreach (var u in us)
            {
                //update view
                Users.Add(u);
            }
        }
        #endregion
    }
}
