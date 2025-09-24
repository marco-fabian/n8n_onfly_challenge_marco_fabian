describe('Fallback Local', () => {
  test('deve gerar número aleatório no range especificado', () => {
    const min = 1;
    const max = 100;

    // Gerar 100 números para testar distribuição
    const numbers = [];
    for (let i = 0; i < 100; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(randomNumber);
    }

    // Verificar se todos estão no range
    numbers.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(min);
      expect(num).toBeLessThanOrEqual(max);
      expect(Number.isInteger(num)).toBe(true);
    });
  });

  test('deve gerar números diferentes em chamadas consecutivas', () => {
    const min = 1;
    const max = 1000;

    const number1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const number2 = Math.floor(Math.random() * (max - min + 1)) + min;

    expect(number1).not.toBe(number2);
  });

  test('deve funcionar com range mínimo (1-1)', () => {
    const min = 1;
    const max = 1;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    expect(randomNumber).toBe(1);
  });

  test('deve funcionar com range máximo (1-1000000)', () => {
    const min = 1;
    const max = 1000000;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});

