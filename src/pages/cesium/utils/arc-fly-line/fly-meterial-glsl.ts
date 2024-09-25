const FlowingLineMaterialGLSL = `
float SPEED_STEP = 0.01; // 流动速度的步长

// drawLight 函数计算线条的颜色和宽度
vec4 drawLight(float xPos, vec2 st, float headOffset, float tailOffset, float widthOffset) {
  // 计算线条长度
  float lineLength = smoothstep(xPos + headOffset, xPos, st.x) - smoothstep(xPos, xPos - tailOffset, st.x);
  // 计算线条宽度
  float lineWidth = smoothstep(widthOffset, 0.5, st.y) - smoothstep(0.5, 1.0 - widthOffset, st.y);
  return vec4(lineLength * lineWidth); // 返回颜色值
}

// czm_getMaterial 函数生成材质
czm_material czm_getMaterial(czm_materialInput materialInput) {
  czm_material m = czm_getDefaultMaterial(materialInput); // 获取默认材质

  // 计算基于时间的正弦值
  float sinTime = sin(czm_frameNumber * SPEED_STEP * speed);

  vec4 v4_core; // 核心颜色
  vec4 v4_color; // 主颜色
  float xPos = 0.0; // 线条的位置

  // 根据正弦值计算线条的位置
  if (sinTime < 0.0) {
    xPos = cos(czm_frameNumber * SPEED_STEP * speed) + 1.0 - tailsize;
  } else {
    xPos = -cos(czm_frameNumber * SPEED_STEP * speed) + 1.0 - tailsize;
  }

  // 计算颜色和核心效果
  v4_color = drawLight(xPos, materialInput.st, headsize, tailsize, widthoffset);
  v4_core = drawLight(xPos, materialInput.st, coresize, coresize * 2.0, widthoffset * 2.0);

  // 设置材质的 diffuse 和 alpha 属性
  m.diffuse = color.xyz + v4_core.xyz * v4_core.w * 0.8;
  m.alpha = pow(v4_color.w, 3.0);

  return m;
}
`

export { FlowingLineMaterialGLSL }
