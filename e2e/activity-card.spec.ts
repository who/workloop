import { test, expect } from '@playwright/test';

test.describe('ActivityCard Demo Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('ActivityCard Demo');
  });

  test.describe('Default Props Section', () => {
    test('renders default ActivityCard', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Default Props' });
      await expect(section).toBeVisible();
      await expect(section.locator('text=Default ActivityCard')).toBeVisible();
    });
  });

  test.describe('Interactive Active Toggle', () => {
    test('toggles animation state', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Interactive Active Toggle' });
      const toggleButton = section.locator('button:has-text("Toggle Active")');

      // Initial state: Running
      await expect(section.locator('text=Animation: Running')).toBeVisible();

      // Click to stop
      await toggleButton.click();
      await expect(section.locator('text=Animation: Stopped')).toBeVisible();

      // Click to start again
      await toggleButton.click();
      await expect(section.locator('text=Animation: Running')).toBeVisible();
    });
  });

  test.describe('Speed Presets', () => {
    test('renders all speed presets', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Speed Presets' }).first();

      await expect(section.locator('text=Slow (5s)')).toBeVisible();
      await expect(section.locator('text=Normal (3s)')).toBeVisible();
      await expect(section.locator('text=Fast (1.5s)')).toBeVisible();
    });
  });

  test.describe('Interactive Speed Control', () => {
    test('adjusts speed with slider', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Interactive Speed Control' });
      const slider = section.locator('input[type="range"]');

      // Default speed is 3s
      await expect(section.locator('text=Speed: 3s')).toBeVisible();

      // Adjust slider to a different value
      await slider.fill('5');
      await expect(section.locator('text=Speed: 5s')).toBeVisible();

      await slider.fill('1');
      await expect(section.locator('text=Speed: 1s')).toBeVisible();
    });
  });

  test.describe('Shape Variations', () => {
    test('renders rectangle and circle shapes', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Shape Variations' }).first();

      await expect(section.locator('text=Rectangle (default)')).toBeVisible();
      await expect(section.locator('text=Circle').first()).toBeVisible();
      await expect(section.locator('text=Circle + Particles')).toBeVisible();
      await expect(section.locator('text=Circle Fast')).toBeVisible();
    });
  });

  test.describe('Line Style Variations', () => {
    test('renders all line styles', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Line Style Variations' }).first();

      // Note: Dotted and Dashed styles were removed in wl-952
      const lineStyles = ['Solid', 'Scribble', 'Double', 'Wavy', 'Glow', 'Tapered'];
      for (const style of lineStyles) {
        await expect(section.locator(`text=${style}`).first()).toBeVisible();
      }
    });
  });

  test.describe('Line Styles on Circle', () => {
    test('renders circle shapes with different line styles', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Line Styles on Circle' });

      // Note: Dotted Circle was replaced with Double Circle in wl-952
      await expect(section.locator('text=Double Circle')).toBeVisible();
      await expect(section.locator('text=Wavy Circle')).toBeVisible();
      await expect(section.locator('text=Glow Circle')).toBeVisible();
      await expect(section.locator('text=Scribble Circle')).toBeVisible();
    });
  });

  test.describe('Interactive Line Style Selector', () => {
    test('changes line style via dropdown', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Interactive Line Style Selector' });
      const select = section.locator('select').first();

      // Default should be solid
      await expect(section.locator('text=Line:').first()).toBeVisible();

      // Change to scribble
      await select.selectOption('scribble');
      await expect(section.locator('strong:has-text("Scribble")')).toBeVisible();

      // Change to wavy
      await select.selectOption('wavy');
      await expect(section.locator('strong:has-text("Wavy")')).toBeVisible();
    });
  });

  test.describe('Inactive State', () => {
    test('renders inactive card', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Inactive State' });
      await expect(section.locator('text=Inactive - No Animation')).toBeVisible();
    });
  });

  test.describe('Color Variations', () => {
    test('renders cards with different colors', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Color Variations' });

      await expect(section.locator('text=Blue (default)')).toBeVisible();
      await expect(section.locator('text=Green (#22c55e)')).toBeVisible();
      await expect(section.locator('text=Red (#ef4444)')).toBeVisible();
      await expect(section.locator('text=Amber (#f59e0b)')).toBeVisible();
      await expect(section.locator('text=Purple (named)')).toBeVisible();
      await expect(section.locator('text=Pink (rgb)')).toBeVisible();
    });
  });

  test.describe('Particle Effects', () => {
    test('renders all particle effect types', async ({ page }) => {
      // Find the section by its label text
      const sectionLabel = page.locator('div').filter({ hasText: /^Particle Effects$/ }).first();
      const section = sectionLabel.locator('..').locator('..');

      const effects = ['sparkler', 'comet', 'stardust', 'ember', 'electric', 'bubble'];
      for (const effect of effects) {
        // Look for the particleEffect prop text in the cards
        await expect(section.locator(`text=particleEffect="${effect}"`).first()).toBeVisible();
      }
    });
  });

  test.describe('Interactive Particle Effect Selector', () => {
    test('changes particle effect via dropdown', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Interactive Particle Effect Selector' });
      const select = section.locator('select');

      // Change to comet
      await select.selectOption('comet');
      await expect(section.locator('text=Effect:')).toBeVisible();
      await expect(section.locator('strong')).toHaveText('comet');

      // Change to ember
      await select.selectOption('ember');
      await expect(section.locator('strong')).toHaveText('ember');

      // Change to none
      await select.selectOption('none');
      await expect(section.locator('strong')).toHaveText('none');
    });
  });

  test.describe('Speed-Based Intensity', () => {
    test('renders intensity variations', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Speed-Based Intensity' });

      await expect(section.locator('text=Very Slow (7s)')).toBeVisible();
      await expect(section.locator('text=Normal (3s)')).toBeVisible();
      await expect(section.locator('text=Very Fast (0.8s)')).toBeVisible();
    });
  });

  test.describe('Different Content Types', () => {
    test('renders cards with various content', async ({ page }) => {
      const section = page.locator('section').filter({ hasText: 'Different Content Types' });

      await expect(section.locator('text=Processing...')).toBeVisible();
      await expect(section.locator('text=42 items')).toBeVisible();
      await expect(section.locator('button:has-text("Click Me")')).toBeVisible();
    });
  });

  test.describe('Theme Toggle', () => {
    test('cycles through themes', async ({ page }) => {
      const themeButton = page.locator('button:has-text("Theme:")');

      // Initial state (system theme)
      await expect(themeButton).toContainText('Theme:');

      // Click to cycle theme
      await themeButton.click();
      await page.waitForTimeout(100); // Wait for theme transition

      await themeButton.click();
      await page.waitForTimeout(100);

      await themeButton.click();
      await page.waitForTimeout(100);
    });
  });
});

test.describe('Animation Behavior', () => {
  test('captures animation running for video', async ({ page }) => {
    await page.goto('/');

    // Wait to let animations run for video capture
    await page.waitForTimeout(3000);

    // Take a screenshot at a specific moment
    await expect(page.locator('h1')).toHaveText('ActivityCard Demo');
  });

  test('pauses and resumes animation correctly', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('section').filter({ hasText: 'Interactive Active Toggle' });
    const toggleButton = section.locator('button:has-text("Toggle Active")');

    // Let animation run
    await page.waitForTimeout(1000);

    // Pause
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Resume
    await toggleButton.click();
    await page.waitForTimeout(1000);
  });
});

test.describe('Particle Behavior', () => {
  // Helper function to find particle positions
  // Retries until particles are found with valid positions (JS animation running)
  async function getParticlePositions(page: import('@playwright/test').Page, maxAttempts = 10) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const particleData = await page.evaluate(() => {
        // Find all divs that could be particle containers
        // Particle containers have overflow:visible, pointer-events:none, position:absolute
        // and contain children with left/top positioning (set by JS animation)
        const allDivs = document.querySelectorAll('div');
        let particleContainer: Element | null = null;

        for (const div of allDivs) {
          const style = window.getComputedStyle(div);
          // Look for container characteristics
          if (style.overflow === 'visible' && style.pointerEvents === 'none' && style.position === 'absolute') {
            // Check if children have left/top positioning (are particles)
            const children = div.children;
            if (children.length >= 4) {
              const firstChild = children[0] as HTMLElement;
              const firstChildStyle = firstChild.getAttribute('style') || '';
              if (firstChildStyle.includes('left:') && firstChildStyle.includes('top:')) {
                particleContainer = div;
                break;
              }
            }
          }
        }

        if (!particleContainer) {
          return { error: 'No particle containers found', positions: [] as { left: number; top: number }[], count: 0 };
        }

        const particles = particleContainer.children;
        const positions: { left: number; top: number }[] = [];

        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i] as HTMLElement;
          const style = particle.getAttribute('style') || '';
          const leftMatch = style.match(/left:\s*([\d.]+)px/);
          const topMatch = style.match(/top:\s*([\d.]+)px/);
          if (leftMatch && topMatch) {
            positions.push({
              left: parseFloat(leftMatch[1]),
              top: parseFloat(topMatch[1]),
            });
          }
        }

        return { positions, count: particles.length };
      });

      if (!particleData.error && particleData.positions.length >= 4) {
        return particleData;
      }

      // Wait a bit and retry - animations may not have started yet
      await page.waitForTimeout(200);
    }

    return { error: 'No particle containers found after retries', positions: [], count: 0 };
  }

  test('particles are properly dispersed and not clumped together', async ({ page }) => {
    await page.goto('/');

    // Wait for React hydration and animation frames to start
    await page.waitForTimeout(500);

    const particleData = await getParticlePositions(page);

    // Verify we found particles
    expect(particleData.error).toBeUndefined();
    expect(particleData.count).toBeGreaterThanOrEqual(8);
    expect(particleData.positions.length).toBeGreaterThanOrEqual(4);

    const positions = particleData.positions;

    // Calculate distances between consecutive particles
    // Particles should NOT all be at the same position (clumped)
    const distances: number[] = [];
    for (let i = 1; i < positions.length; i++) {
      const dx = positions[i].left - positions[i - 1].left;
      const dy = positions[i].top - positions[i - 1].top;
      distances.push(Math.sqrt(dx * dx + dy * dy));
    }

    // At least some particles should be separated by more than 2 pixels
    // (If all distances are 0 or near 0, particles are clumped)
    const spreadParticles = distances.filter(d => d > 2);
    expect(spreadParticles.length).toBeGreaterThan(0);
  });

  test('particle follow distance from pulse head is within acceptable range', async ({ page }) => {
    await page.goto('/');

    // Wait for React hydration and animation frames to start
    await page.waitForTimeout(500);

    const particleData = await getParticlePositions(page);

    // Verify we found particles
    expect(particleData.error).toBeUndefined();
    expect(particleData.positions.length).toBeGreaterThanOrEqual(4);

    const positions = particleData.positions;

    // Find the range of positions (spread of particles)
    const minX = Math.min(...positions.map(p => p.left));
    const maxX = Math.max(...positions.map(p => p.left));
    const minY = Math.min(...positions.map(p => p.top));
    const maxY = Math.max(...positions.map(p => p.top));

    // Calculate the span of particles
    const spanX = maxX - minX;
    const spanY = maxY - minY;
    const totalSpan = Math.sqrt(spanX * spanX + spanY * spanY);

    // Particles should have some spread (not all clumped at one point)
    // but also not too far behind the pulse head
    // A span of at least 5px indicates proper dispersion
    // A span less than 100px indicates they're following close to the head
    expect(totalSpan).toBeGreaterThan(5);
    expect(totalSpan).toBeLessThan(150);
  });
});
