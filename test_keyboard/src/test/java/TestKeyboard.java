import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Selenide.*;

public class TestKeyboard
{
    public static LoginPage loginPage;
    public static KeyboardPage keyboardPage;

    @Test
    public void signIn()
    {
        loginPage = open(ConfProperties.getProperty("loginPage"), LoginPage.class);
        loginPage.inputLogin(ConfProperties.getProperty("login"));
        loginPage.inputPassword(ConfProperties.getProperty("password"));
        keyboardPage = loginPage.getKeyboardPage();
    }

    @Test
    public void type1()
    {
        keyboardPage.inputWord();
        keyboardPage.inputSpace();
        keyboardPage.isColorGreenHint();
    }

    @Test
    public void type2()
    {
        type1();
    }

    @Test
    public void type3()
    {
        type1();
    }

    @Test
    public void type4()
    {
        keyboardPage.inputWord();
        keyboardPage.inputSpace();
        keyboardPage.isNotColorGreenHint();
        keyboardPage.isNotColorBlueHint();
    }

    @Test
    public void type5()
    {
        keyboardPage.inputWord();
        keyboardPage.inputSpace();
        keyboardPage.isColorBlueHint();
    }
}
