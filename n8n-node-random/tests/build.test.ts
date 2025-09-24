/**
 * Testes de build e compilação
 * Verifica se os arquivos foram gerados corretamente
 */

import fs from 'fs';
import path from 'path';

describe('Build e Compilação', () => {
  const distPath = path.join(__dirname, '..', 'dist', 'nodes', 'Random');

  test('deve ter gerado o arquivo Random.node.js', () => {
    const filePath = path.join(distPath, 'Random.node.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('deve ter gerado o arquivo Random.node.d.ts', () => {
    const filePath = path.join(distPath, 'Random.node.d.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('deve ter copiado o arquivo random.svg', () => {
    const filePath = path.join(distPath, 'random.svg');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('deve ter conteúdo válido no arquivo JavaScript', () => {
    const filePath = path.join(distPath, 'Random.node.js');
    const content = fs.readFileSync(filePath, 'utf8');

    // Verificar se contém elementos essenciais
    expect(content).toContain('Random');
    expect(content).toContain('execute');
    expect(content).toContain('random.org');
  });

  test('deve ter conteúdo válido no arquivo SVG', () => {
    const filePath = path.join(distPath, 'random.svg');
    const content = fs.readFileSync(filePath, 'utf8');

    // Verificar se é um SVG válido
    expect(content).toContain('<svg');
    expect(content).toContain('</svg>');
  });
});

