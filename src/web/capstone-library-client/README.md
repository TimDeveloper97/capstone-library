# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### use-case

1. Đăng nhập
- Tại trang chủ: bấm "Đăng nhập" ở góc trên bên phải -> tại trang đăng nhập, nhập tài khoản, mật khẩu để đăng nhập.
- Validation: username và password không được để trống.
- Notification: Tài khoản hoặc mật khẩu không chính xác.
2. Đăng ký
- Tại trang chủ: Bấm "Đăng ký" -> tại trang đăng ký, nhập thông tin.
- Validation: tên, tên đăng nhập, mật khẩu, xác nhận mật khẩu không được để trống. xác nhận mật khẩu phải trùng với mật khẩu
- Notification: Trùng tên đăng nhập... (message trả về từ server)
3. Cập nhật thông tin
- Rê chuột vào tên người dùng ở góc trên phải, chọn "Cài đặt tài khoản". Trang này sẽ hiển thị thông tin người dùng.
Tại tab "Thông tin của bạn", bấm "Sửa thông tin", Textfield sẽ hiện thị những trường mà có thể thay đổi. Sau đó bấm "Lưu thay đổi"
- Validation: chưa có
- Notification: không
4. Thay đổi mật khẩu
- Ở trang tài khoản, chọn tab "Đổi mật khẩu". Điền thông tin rồi bấm "Đổi mật khẩu". 
- Validation: chưa có
- Notification: message từ server, (success hoặc error)
5. Đăng xuất
- Rê chuột vào tên người dùng ở góc trên phải, chọn "Đăng xuất". Web sẽ chuyển đến trang chủ.
- Hiện đang bị lỗi đăng nhập và đăng xuất, sau khi đăng nhập hoặc đăng xuất thì phải refresh lại trang (f5) --> sẽ fix.
6. Kho sách
- Lấy danh sách category từ server, hiển thị lên Sidebar bên trái. Vẫn chưa lấy sách từ server và để data fake.
7. Chi tiết sách
- Bấm vào sách sẽ đến trang chi tiết về sách, chưa gắn với api, có thể chọn ảnh để xem, tăng giảm số lượng thuê. Số lượng bằng 1 thì
không giảm được.
8. Thêm sách
- Ở menu kho sách trên header, chọn thêm sách -> chuyển hướng đến trang thêm sách. Chưa có api
9. Quên mật khẩu.
- Ở trang đăng nhập, bấm vào "Quên mật khẩu" -> chuyển đến trang quên mật khẩu. Chưa có api
10. Trang không tìm thấy
- Khi bấm vào những link chưa có, chưa viết, hoặc nhập đường dẫn không chính xác, sẽ chuyển hướng đến trang không tìm thấy (404 not found)
- Hầu hết các nút ở trang chủ khi lăn chuột xuống dưới sẽ dẫn đến các trang chưa làm -> đến trang 404 not found.

