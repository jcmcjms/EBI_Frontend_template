if (import.meta.env.DEV) {
  try {
    const { worker } = await import('./browser');
    await worker.start();
    console.info('[MSW] Mocking enabled');
  } catch (error) {
    console.warn('[MSW] Failed to start:', error);
  }
}
