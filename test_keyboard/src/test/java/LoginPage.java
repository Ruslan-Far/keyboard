import io.qameta.allure.Step;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.page;

public class LoginPage
{
    @Step
    public void inputLogin(String login)
    {
        $("#login-field").shouldBe(visible);
        $("#login-field").setValue(login);
    }

    @Step
    public void inputPassword(String password)
    {
        $("#password-field").shouldBe(visible);
        $("#password-field").setValue(password).pressEnter();
    }

    public KeyboardPage getKeyboardPage()
    {
        $("#logout").shouldBe(visible);
        return page(KeyboardPage.class);
    }
}