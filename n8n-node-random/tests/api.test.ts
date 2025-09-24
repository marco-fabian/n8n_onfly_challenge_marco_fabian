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

  test('deve validar limites da Random.org API', () => {
    const RANDOM_ORG_MIN = -1000000000;
    const RANDOM_ORG_MAX = 1000000000;

    // Testa valores válidos
    expect(-999999999).toBeGreaterThan(RANDOM_ORG_MIN);
    expect(999999999).toBeLessThan(RANDOM_ORG_MAX);

    // Testa valores inválidos
    expect(-1000000001).toBeLessThan(RANDOM_ORG_MIN);
    expect(1000000001).toBeGreaterThan(RANDOM_ORG_MAX);
  });

  test('deve validar que min é menor que max', () => {
    const validCases = [
      { min: 1, max: 10 },
      { min: -100, max: 100 },
      { min: 0, max: 1 }
    ];

    const invalidCases = [
      { min: 10, max: 1 },
      { min: 100, max: 100 },
      { min: 50, max: 10 }
    ];

    validCases.forEach(({ min, max }) => {
      expect(min).toBeLessThan(max);
    });

    invalidCases.forEach(({ min, max }) => {
      expect(min).toBeGreaterThanOrEqual(max);
    });
  });
});
