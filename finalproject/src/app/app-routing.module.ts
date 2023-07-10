import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodoComponent } from "./todo/todo.component";



const appRoutes: Routes = [
    {path: "", redirectTo: "/todos", pathMatch: "full"},
    {path: "todos", component: TodoComponent, children: [
        {path: ":id", component: TodoComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
}) export class AppRoutingModule {
    
}