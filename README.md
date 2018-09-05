# Getting Started

This is a very simple Node application that uses the Express framework. It is designed to work well with [Visual Studio Code](https://code.visualstudio.com) and to be easily deployed to [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/), Azure's fully-managed Platform as a Service (PaaS) that let's you deploy and scale web, mobile, and API apps. 

## Running the Application

After cloning the [repository](`https://github.com/microsoft/vscode-tas-express`), install the necessary  dependencies and then run the application:

``` console
npm install
npm start
```

By default, the server listens on port 3000, so point your favorite browser to `http://localhost:3000`.

In VS Code, simply press `F5` to launch the application in debug mode. Set a breakpoint and refresh the page to hit the breakpoint. From there, inspect variables, set watches, browse the call stack, and more. You can find more information about building and debugging Node applications, please see the [VS Code documentation](https://code.visualstudio.com/docs/azure/deployment).

## Deploy to the Cloud

When you first open this folder in VS Code, you'll be prompted to install the [Azure App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice). 

The App Service extension lets you quickly quickly create sites, deploy them, view logs, and even set environment variables (such as a Connection String), right from within VS Code. For more information, see the [App Service Walkthrough](https://code.visualstudio.com/tutorials/app-service-extension/getting-started).

## Additional Documentation

More information on building and deploying Node applications to Azure can be found on the [Node Developer Center](https://docs.microsoft.com/en-us/javascript/azure/?view=azure-node-latest).

# Contributing

This sample's code is hosted on GitHub: https://github.com/microsoft/vscode-tas-express.

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License
[MIT](LICENSE.md)