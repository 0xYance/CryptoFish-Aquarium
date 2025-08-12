// Main Application Entry Point
window.AquariumApp = {
  // Main animation loop
  render(currentTime) {
    const state = window.AquariumState;
    
    // Calculate frame timing
    const dt = window.FishPhysics.calculateTimestep(currentTime);
    window.FishPhysics.updateFPS(dt);
    
    if (!state.paused) {
      // Update food particles
      window.FoodManager.updateAllFood(dt);
      
      // Update fish
      window.FishPhysics.updateAllFish(dt);
      
      // Clear and render
      window.CanvasManager.clearFish();
      
      // Render food particles
      window.FoodManager.renderAllFood(state.fishCtx);
      
      // Render fish
      window.FishPhysics.renderAllFish(state.fishCtx);
    }
    
    // Continue animation loop
    requestAnimationFrame((time) => this.render(time));
  },

  // Initialize the application
  async init() {
    console.log('🐠 Initializing Cryptofish Pixel Aquarium...');
    
    try {
      // Initialize core systems
      window.AquariumState.init();
      window.DOMElements.init();
      
      // Initialize rendering systems
      window.CanvasManager.init();
      window.BackgroundRenderer.drawBackground();
      
      // Initialize UI systems
      window.MenuControls.init();
      window.FileHandlers.init();
      window.EventListeners.init();
      window.FullscreenManager.init();
      
      // Initialize blockchain integration
      await this.initBlockchain();
      
      // Start the animation loop
      requestAnimationFrame((time) => this.render(time));
      
      console.log('✅ Aquarium initialized successfully!');
      
    } catch (error) {
      console.error('❌ Failed to initialize aquarium:', error);
      window.AquariumState.setStatus('Initialization failed');
    }
  },

  // Initialize blockchain features
  async initBlockchain() {
    try {
      await window.BlockchainUtils.ensureEthers();
      await window.BlockchainUtils.initProvider();
      window.AquariumState.setStatus('ready');
      console.log('🔗 Blockchain integration ready');
    } catch (error) {
      console.warn('⚠️ Blockchain integration failed:', error);
      window.AquariumState.setStatus('ready (NFT lookup unavailable)');
    }
  },

  // Cleanup function
  cleanup() {
    // Stop animation loop and cleanup resources
    window.EventListeners.cleanup();
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.AquariumApp.init();
  });
} else {
  // DOM already loaded
  window.AquariumApp.init();
}