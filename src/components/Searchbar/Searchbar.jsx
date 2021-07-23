import { Header, HeaderForm, Button, InputSection } from './Searchbar.style';

export function Searchbar ({onSubmit}) {
    const heandleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.target.elements.inputSection.value);
    };

    return (
        <Header>
            <HeaderForm onSubmit={heandleSubmit}>
                <Button type="submit"></Button>
                <InputSection placeholder="Search images and photos" name="inputSection"></InputSection>
            </HeaderForm>
        </Header>
    );
}
