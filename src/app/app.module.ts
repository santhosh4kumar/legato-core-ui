import { fakeBackendProvider } from './interceptors/fake-backend';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { FeedbackService } from './services/feedback.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AddFeedbackComponent } from './contact/add-feedback/add-feedback.component';
import { ListFeedbackComponent } from './contact/list-feedback/list-feedback.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    CartComponent,
    AboutComponent,
    ContactComponent,
    AddFeedbackComponent,
    ListFeedbackComponent,
    CoursesComponent,
    AddCourseComponent,
    CourseListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule, 
    BrowserAnimationsModule, 
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    ToastContainerModule
  ],
  providers: [FeedbackService, AuthGuard, AuthenticationService, JwtInterceptor, ErrorInterceptor, fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
