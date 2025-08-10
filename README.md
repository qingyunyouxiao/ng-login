# Angular Login

发布日期：2025年8月10日

主题：学习一门新的语言和框架有很多方法，我选择官方文档，让我们看一下Angular[网站首页](https://angular.dev/overview)。

在学习Angular之前，你需要了解什么是TypeScript。TypeScript是基于JavaScript的强类型编程语言，好的。

**构建Angular的基本要素：组件，模板，依赖注入。**

## 组件

组件包括一个带有组件注释的类、一个组件装饰器、一个HTML的模板和样式。

每个 Angular 组件都有一个**模板**，用于定义该组件渲染到页面上的[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)。通过使用模板，Angular 能够随着数据的变化自动保持页面更新。

Angular 还支持属性绑定，以帮助您为 HTML 元素的属性和属性设置值，并将值传递给应用程序的表示逻辑。

```html
<p
  [id]="sayHelloId"
  [style.color]="fontColor">
  You can set my color in the component!
</p>
```

声明事件监听器来监听并响应用户操作，例如按键、鼠标移动、点击和触摸。您可以通过在括号中指定事件名称来声明事件监听器：

```html
<button
  type="button"
  [disabled]="!canClick"
  (click)="sayMessage()">
  Trigger alert message
</button>
```

[disabled] 将组件的属性值绑定到HTML元素的属性上，用于数据从组件到视图的单向绑定，(click) 将HTML元素的事件绑定到组件的方法上，用于将用户的交互事件传递给组件。如何没有方括号或括号，它就是HTML属性。

你可以在模板中使用双花括号绑定动态文本，这告诉 Angular 它负责模板内部的表达式并确保其正确更新。

```
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class AppComponent {
  theme = 'dark';
}
```

在这个例子中，当代码片段呈现到页面时，Angular 将替换 {{ theme }} 为 dark。

```
<!-- Rendered Output -->
<p>Your color preference is dark.</p>
```

## 依赖注入

依赖注入允许您声明 TypeScript 类的依赖项，而无需处理它们的实例化。Angular 会为您处理实例化。这种设计模式让您可以编写更易于测试且更灵活的代码。理解依赖注入对于开始使用 Angular 来说并非至关重要，但强烈建议将其作为最佳实践。Angular 的许多方面都在一定程度上利用了它。

为了说明依赖注入的工作原理，请考虑以下示例。第一个文件 logger.service.ts 定义了一个 Logger 类。该类包含一个 writeCount 将数字记录到控制台的函数。

```ts
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Logger {
  writeCount(count: number) {
    console.warn(count);
  }
}
```

接下来，该文件定义了一个 Angular 组件。该组件包含一个使用Logger 类函数的hello-world-di.component.ts 按钮。为了访问该函数，需要通过构造函数将服务注入到类中。

```ts
import { Component } from '@angular/core';
import { Logger } from '../logger.service';

@Component({
  selector: 'hello-world-di',
  templateUrl: './hello-world-di.component.html'
})
export class HelloWorldDependencyInjectionComponent  {
  count = 0;

  constructor(private logger: Logger) { }

  onLogMe() {
    this.logger.writeCount(this.count);
    this.count++;
  }
}
```

## 创建组件

```
ng generate compoment your-compoment
```

## 添加静态文件

在本项目代码中，angular.png图标文件储存在





```html
<app-buttons (loginClick)="atLogin()" (logoutClick)="atLogout()" />
<app-welcome-content *ngIf="componentToShow == 'welcome'" />
<app-login-form *ngIf="componentToShow == 'login'" />
```

关于ngIf的[用法](https://v16.angular.io/api/common/NgIf#description)，注意大小写。

## 创建后端

![](C:\Users\PC\Pictures\Screenshots\image-20250810101908578.png)

这是我的后端项目结构，我创建了后端接口来接受前端 /login 请求。

```java
// LoginController.java

package com.example.demo.controllers;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        boolean success = "2293".equals(username) && "2293".equals(password);

        Map<String, Object> response = new HashMap<>();
        response.put("status", success ? "success" : "fail");
        response.put("message", success ? "Login successful" : "Invalid credentials");
        return response;
    }
}

```

```java
// CorsConfig.java

package com.example.demo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}

```

启动前后端项目，在前端登录界面输入用户名和密码，返回 Login sucessful。

