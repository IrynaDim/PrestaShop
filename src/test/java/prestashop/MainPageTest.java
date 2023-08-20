package prestashop;

import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;
import prestashop.config.Factory;
import prestashop.model.Product;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import static org.testng.AssertJUnit.*;

public class MainPageTest extends BaseTest {

    @Test
    public void checkUkrainianLanguageExist() {
        Factory.getInstance().getDriver().navigate().refresh();
        List<WebElement> languages = getMainPage().getLanguages();
        long size = languages.stream()
                .filter(l -> l.getText()
                        .equals("Українська"))
                .count();
        assertEquals("No ukrainian language in the list." + size, size, 1L);
    }

    @Test
    public void checkLanguageSize() {
        Factory.getInstance().getDriver().navigate().refresh();
        List<WebElement> languages = getMainPage().getLanguages();
        assertEquals("Language size is " + languages.size(), languages.size(), 46);
    }

    @Test
    public void checkArtClothesButton_emptyListOfArts() {
        Factory.getInstance().getDriver().navigate().refresh();
        List<String> clothesHoverElements = getMainPage().getArtHoverElements().stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
        clothesHoverElements.removeIf(String::isEmpty);
        assertEquals("ClothesHoverElements contains " + createStringFromList(clothesHoverElements),
                clothesHoverElements.size(), 0);
    }

    @Test
    public void checkUnSubscribeText() {
        Factory.getInstance().getDriver().navigate().refresh();
        String unsubscribeElement = getMainPage().getUnsubscribeText();
        assertEquals("Unsubscribe element text is " + unsubscribeElement, "You may unsubscribe at any moment. " +
                "For that purpose, please find our contact info in the legal notice.", unsubscribeElement);
    }

    @Test
    public void checkSubscribeText() {
        Factory.getInstance().getDriver().navigate().refresh();
        String emailSubscribeElement = getMainPage().getEmailSubscribeText();
        assertEquals("Email subscribe element text is " + emailSubscribeElement, "Get our latest news and special sales", emailSubscribeElement);
    }

    @Test
    public void checkAccessoriesClothesButton_notEmptyListOfAccessories() {
        Factory.getInstance().getDriver().navigate().refresh();
        List<String> clothesHoverElements = getMainPage().getAccessoriesHoverElements().stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
        clothesHoverElements.removeIf(String::isEmpty);
        System.out.println(clothesHoverElements.size());
        assertEquals("Clothes hover element list contains " + createStringFromList(clothesHoverElements), clothesHoverElements.size(), 2);
        assertEquals("First element is " + clothesHoverElements.get(0), clothesHoverElements.get(0), "STATIONERY");
        assertEquals("Second element is" + clothesHoverElements.get(1), clothesHoverElements.get(1), "HOME ACCESSORIES");
    }

    @Test
    public void checkHoverClothesButton_notEmptyListOfClothes() {
        Factory.getInstance().getDriver().navigate().refresh();
        List<String> clothesHoverElements = getMainPage().getClothesHoverElements().stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
        clothesHoverElements.removeIf(String::isEmpty);
        assertEquals("Clothes hover element list contains " + createStringFromList(clothesHoverElements), clothesHoverElements.size(), 2);
        assertEquals("First element is " + clothesHoverElements.get(0), clothesHoverElements.get(0), "MEN");
        assertEquals("Second element is" + clothesHoverElements.get(1), clothesHoverElements.get(1), "WOMEN");
    }

    @Test
    public void checkSubscribeButtonText_upperCase() {
        Factory.getInstance().getDriver().navigate().refresh();
        String text = getMainPage().getSubscribeButtonText();
        assertEquals("Text on subscribe button is " + text, "SUBSCRIBE", text);
    }

    @Test
    public void checkPopularClothes_CurrencyNameAndPriceNotNull() {
        Factory.getInstance().getDriver().navigate().refresh();
        List<Product> popularClothes = getMainPage().getPopularClothes();
        Set<Product> uniqueProducts = new HashSet<>(popularClothes);
        assertEquals(popularClothes.size(), uniqueProducts.size());
        assertEquals(popularClothes.size(), 8);
        popularClothes.forEach(p -> {
            assertNotNull(p.getCurrency());
            assertNotNull(p.getName());
            assertNotNull(p.getPrice());
            assertTrue(p.getPrice() > 0.00);
        });
    }

    private String createStringFromList(List<String> list) {
        StringJoiner joiner = new StringJoiner(", ");
        for (String element : list) {
            joiner.add(element);
        }
        return joiner.toString();
    }
}
