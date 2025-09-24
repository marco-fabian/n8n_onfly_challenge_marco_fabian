import axios from 'axios';

describe('API Random.org', () => {
  test('deve retornar um número aleatório no range 1-10', async () => {
    const url = 'https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new';

    const response = await axios.get(url);
    const randomNumber = parseInt(String(response.data).trim());

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(10);
    expect(Number.isInteger(randomNumber)).toBe(true);
  });

  test('deve retornar um número aleatório no range 1-100', async () => {
    const url = 'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new';

    const response = await axios.get(url);
    const randomNumber = parseInt(String(response.data).trim());

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(100);
    expect(Number.isInteger(randomNumber)).toBe(true);
  });

  test('deve retornar números diferentes em chamadas consecutivas', async () => {
    const url = 'https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new';

    const response1 = await axios.get(url);
    const response2 = await axios.get(url);

    const number1 = parseInt(String(response1.data).trim());
    const number2 = parseInt(String(response2.data).trim());

    expect(number1).not.toBe(number2);
  });
});
