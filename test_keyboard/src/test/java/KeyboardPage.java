import org.junit.Assert;
import org.openqa.selenium.By;

import static com.codeborne.selenide.Selenide.$;

public class KeyboardPage
{
    public void inputWord()
    {
        $(By.xpath(ConfProperties.getProperty("s"))).click();
        $(By.xpath(ConfProperties.getProperty("m"))).click();
        $(By.xpath(ConfProperties.getProperty("a"))).click();
        $(By.xpath(ConfProperties.getProperty("r"))).click();
        $(By.xpath(ConfProperties.getProperty("t"))).click();
        $(By.xpath(ConfProperties.getProperty("f"))).click();
        $(By.xpath(ConfProperties.getProperty("o"))).click();
        $(By.xpath(ConfProperties.getProperty("n"))).click();
    }

    public void inputSpace()
    {
        $(By.id("space")).click();
    }

    public void isColorGreenHint()
    {
        Assert.assertEquals(ConfProperties.getProperty("green"), $(By.id("hint1")).getCssValue("color"));
        Assert.assertEquals(ConfProperties.getProperty("green"), $(By.id("hint2")).getCssValue("color"));
        Assert.assertEquals(ConfProperties.getProperty("green"), $(By.id("hint3")).getCssValue("color"));
    }

    public void isColorBlueHint()
    {
        Assert.assertEquals(ConfProperties.getProperty("blue"), $(By.id("hint1")).getCssValue("color"));
        Assert.assertEquals(ConfProperties.getProperty("blue"), $(By.id("hint2")).getCssValue("color"));
        Assert.assertEquals(ConfProperties.getProperty("blue"), $(By.id("hint3")).getCssValue("color"));
    }

    public void isNotColorGreenHint()
    {
        Assert.assertNotEquals(ConfProperties.getProperty("green"), $(By.id("hint1")).getCssValue("color"));
        Assert.assertNotEquals(ConfProperties.getProperty("green"), $(By.id("hint2")).getCssValue("color"));
        Assert.assertNotEquals(ConfProperties.getProperty("green"), $(By.id("hint3")).getCssValue("color"));
    }

    public void isNotColorBlueHint()
    {
        Assert.assertNotEquals(ConfProperties.getProperty("blue"), $(By.id("hint1")).getCssValue("color"));
        Assert.assertNotEquals(ConfProperties.getProperty("blue"), $(By.id("hint2")).getCssValue("color"));
        Assert.assertNotEquals(ConfProperties.getProperty("blue"), $(By.id("hint3")).getCssValue("color"));
    }
}
