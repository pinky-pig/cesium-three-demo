const fs = require('fs-extra');
const path = require('path');

// 文件夹路径
const folderPath = path.join(__dirname, '全球国家行政区域边界（带一级行政单位）');  // 修改为你的文件夹路径

// 处理每个文件的函数
async function processGeoJsonFile(filePath) {
    try {
        // 读取 GeoJSON 文件
        const geoJsonData = await fs.readJson(filePath);

        // 确保数据是 FeatureCollection 类型
        if (geoJsonData.type !== 'FeatureCollection') {
            throw new Error('Invalid GeoJSON format');
        }

        // 过滤掉 Point 类型的 Feature
        const filteredFeatures = geoJsonData.features.filter(feature => feature.geometry.type !== 'Point');

        // 生成新的 GeoJSON 数据
        const filteredGeoJsonData = {
            ...geoJsonData,
            features: filteredFeatures
        };

        // 生成输出文件路径
        const outputFilePath = path.join(__dirname, 'geojson_filtered', path.basename(filePath));

        // 创建输出目录（如果不存在）
        await fs.ensureDir(path.dirname(outputFilePath));

        // 写入过滤后的 GeoJSON 文件
        await fs.writeJson(outputFilePath, filteredGeoJsonData, { spaces: 2 });

        console.log(`Filtered GeoJSON saved to ${outputFilePath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// 遍历文件夹中的所有 .geojson 文件
async function processGeoJsonFiles() {
    try {
        const files = await fs.readdir(folderPath);
        const geoJsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.geojson');

        for (const file of geoJsonFiles) {
            const filePath = path.join(folderPath, file);
            await processGeoJsonFile(filePath);
        }
    } catch (error) {
        console.error('Error reading directory:', error.message);
    }
}

// 执行处理操作
processGeoJsonFiles();
