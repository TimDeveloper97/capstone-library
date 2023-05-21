How to build Xamarin Form
Step 1: Download Visual Studio 2019 Installer or higher (Target 2019)
Step 2: Choose Xamarin in VS Installer and Install
Step 3: Open project by click file .sln (xfLibrary.sln)
Step 4: Rebuild project to download all dependence and nuget package
Step 5: Target device VM or Sample (Android) (IOS require MAC or Developer Account)
Step 6: Run project

deloy VM mobile:
- Check debug mode only development
do: Right mouse click xfLibrary.Android => Check in debug mode only development => save all 
=>rebuild => start deloy

Build file Apk: 
1. Android
- Right click in project xfLibrary.Android => Archive (wait build success)
- Choise item => Distribute ... 
- Ad Hoc => If you have one (choise that), if no => Create => Save as => choise location save file 
- Rewrite Name file => Done

2. Ios
- Only support build in Machine (Mac) => can't build extract file
- When you have developer account => build file and upload to App Store
