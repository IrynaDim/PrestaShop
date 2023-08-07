package prestashop.config;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class Synchronize {

    private final long waitDuration = 30;
    WebDriverWait wait;

    Synchronize() {
        wait = new WebDriverWait(DriverProvider.getInstance().getDriver(), Duration.ofSeconds(waitDuration));
    }

    private void disableImplicitWait() {
        DriverProvider.getInstance().getDriver().manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
    }

    private void enableImplicitWait() {
        DriverProvider.getInstance().getDriver().manage().timeouts().implicitlyWait(waitDuration, TimeUnit.SECONDS);
    }


    protected WebElement clickableCustomWait(WebElement element) {
        disableImplicitWait();
        WebElement ele = wait.until(ExpectedConditions.elementToBeClickable(element));
        enableImplicitWait();
        return ele;

    }

    public Boolean invisibleElement(WebElement element) {
        disableImplicitWait();
        Boolean ele = wait.until(ExpectedConditions.invisibilityOf(element));
        enableImplicitWait();
        return ele;

    }

    public WebElement elementDisplayed(WebElement element) {
        disableImplicitWait();
        WebElement ele = wait.until(ExpectedConditions.visibilityOf(element));
        enableImplicitWait();
        return ele;
    }

}
