import * as Cesium from 'cesium'

let chinaAreaPolygon: Cesium.GeoJsonDataSource | undefined
let njAreaPolygon: Cesium.GeoJsonDataSource | undefined
export async function initChinaArea(viewer: Cesium.Viewer) {
	const chinaGeoJsonData = '/json/中华人民共和国.json'

	const chinaDataSource = await Cesium.GeoJsonDataSource.load(chinaGeoJsonData)

	chinaAreaPolygon = chinaDataSource
	viewer.dataSources.add(chinaDataSource)
	// chinaDataSource.show = false;
	// viewer.zoomTo(chinaDataSource);
	// 遍历中国全图 GeoJSON 数据的实体并设置样式
	const chinaEntities = chinaDataSource.entities.values
	for (const entity of chinaEntities) {
		if (entity.polygon) {
			// 设置填充颜色为红色，透明度为0.5
			entity.polygon.material = new Cesium.ColorMaterialProperty(
				Cesium.Color.fromCssColorString('#2b466e90'),
			)
			// 显示 outline
			entity.polygon.outline = new Cesium.ConstantProperty(true)
			// 设置轮廓颜色为黄色
			entity.polygon.outlineColor = new Cesium.ConstantProperty(
				Cesium.Color.fromCssColorString('#ffffff90'),
			) // 黄色
		}
	}
	return chinaDataSource
}

export async function initNanjingArea(viewer: Cesium.Viewer) {
	const njGeoJsonData = '/json/南京市.json'

	const njDataSource = await Cesium.GeoJsonDataSource.load(njGeoJsonData)
	njAreaPolygon = njDataSource
	viewer.dataSources.add(njDataSource)
	// 遍历中国全图 GeoJSON 数据的实体并设置样式
	const chinaEntities = njDataSource.entities.values
	for (const entity of chinaEntities) {
		if (entity.polygon) {
			// 设置填充颜色为红色，透明度为0.5
			entity.polygon.material = new Cesium.ColorMaterialProperty(
				Cesium.Color.fromCssColorString('#afccfd00'),
			)
			// 显示 outline
			entity.polygon.outline = new Cesium.ConstantProperty(true)
			entity.polygon.outlineWidth = new Cesium.ConstantProperty(100)
			// 设置轮廓颜色为黄色
			entity.polygon.outlineColor = new Cesium.ConstantProperty(
				Cesium.Color.fromCssColorString('#ea945f'),
			)
		}
	}
	return njDataSource
}

export function initEarthArea(viewer: Cesium.Viewer) {
	const earthAreas = [
		'日本Q17.geojson',
		'中華民國Q865.geojson',
		'美國Q30.geojson',
		'加拿大Q16.geojson',
		// '英国Q145.geojson',

		// '不丹Q917.geojson',
		// '中非共和國Q929.geojson',
		// '丹麥Q35.geojson',
		// '丹麥王國Q756617.geojson',
		// '乌兹别克斯坦Q265.geojson',
		// '乍得Q657.geojson',
		// '也门Q805.geojson',
		// '亞美尼亞Q399.geojson',
		// '他施Q44826.geojson',
		// '以色列Q801.geojson',
		// '伊拉克Q796.geojson',
		// '伊朗Q794.geojson',
		// '佛得角Q1011.geojson',
		// '俄罗斯Q159.geojson',
		// '保加利亚Q219.geojson',
		// '克羅地亞Q224.geojson',
		// '冰島Q189.geojson',
		// '几内亚Q1006.geojson',
		// '列支敦斯登Q347.geojson',
		// '刚果民主共和国Q974.geojson',
		// '利比亞Q1016.geojson',
		// '利比里亞Q1014.geojson',
		// '剛果共和國Q971.geojson',
		// '加蓬Q1000.geojson',
		// '匈牙利Q28.geojson',
		// '北马其顿Q221.geojson',
		// '千里達及托巴哥Q754.geojson',
		// '南蘇丹Q958.geojson',
		// '南非Q258.geojson',
		// '卡塔尔Q846.geojson',
		// '卢旺达Q1037.geojson',
		// '印度Q668.geojson',
		// '印度尼西亚Q252.geojson',
		// '危地马拉Q774.geojson',
		// '厄瓜多尔Q736.geojson',
		// '厄立特里亞Q986.geojson',
		// '古巴Q241.geojson',
		// '吉尔吉斯斯坦Q813.geojson',
		// '吉布提Q977.geojson',
		// '吐瓦魯Q672.geojson',
		// '哈萨克斯坦Q232.geojson',
		// '哥伦比亚Q739.geojson',
		// '哥斯达黎加Q800.geojson',
		// '喀麦隆Q1009.geojson',
		// '土庫曼斯坦Q874.geojson',
		// '土耳其Q43.geojson',
		// '圣卢西亚Q760.geojson',
		// '圣多美和普林西比Q1039.geojson',
		// '圣文森特和格林纳丁斯Q757.geojson',
		// '圭亚那Q734.geojson',
		// '坦桑尼亞Q924.geojson',
		// '埃及Q79.geojson',
		// '埃塞俄比亚Q115.geojson',
		// '塔吉克斯坦Q863.geojson',
		// '塞内加尔Q1041.geojson',
		// '塞拉利昂Q1044.geojson',
		// '塞浦路斯Q229.geojson',
		// '塞舌尔Q1042.geojson',
		// '墨西哥Q96.geojson',
		// '多哥Q945.geojson',
		// '多明尼加Q786.geojson',
		// '多米尼克Q784.geojson',
		// '大韩民国Q884.geojson',
		// '奈及利亞Q1033.geojson',
		// '奧地利Q40.geojson',
		// '委內瑞拉Q717.geojson',
		// '婆罗多布尔土邦Q854850.geojson',
		// '孟加拉國Q902.geojson',
		// '安哥拉Q916.geojson',
		// '安提瓜和巴布达Q781.geojson',
		// '安道尔Q228.geojson',
		// '密克罗尼西亚联邦Q702.geojson',
		// '尼加拉瓜Q811.geojson',
		// '尼日尔Q1032.geojson',
		// '尼泊爾Q837.geojson',
		// '岡比亞Q1005.geojson',
		// '巴勒斯坦Q219060.geojson',
		// '巴哈馬Q778.geojson',
		// '巴基斯坦Q843.geojson',
		// '巴布亚新几内亚Q691.geojson',
		// '巴拉圭Q733.geojson',
		// '巴林Q398.geojson',
		// '巴西Q155.geojson',
		// '布吉納法索Q965.geojson',
		// '希腊Q41.geojson',
		// '帛琉Q695.geojson',
		// '库克群岛Q26988.geojson',
		// '德國Q183.geojson',
		// '意大利Q38.geojson',
		// '愛沙尼亞Q191.geojson',
		// '愛爾蘭共和國Q27.geojson',
		// '所罗门群岛Q685.geojson',
		// '拉脫維亞Q211.geojson',
		// '挪威Q20.geojson',
		// '捷克Q213.geojson',
		// '摩洛哥Q1028.geojson',
		// '敘利亞Q858.geojson',
		// '斐濟Q712.geojson',
		// '斯洛伐克Q214.geojson',
		// '斯洛文尼亞Q215.geojson',
		// '斯里蘭卡Q854.geojson',
		// '新加坡Q334.geojson',
		// '新西兰Q664.geojson',
		// '智利Q298.geojson',
		// '朝鮮民主主義人民共和國Q423.geojson',
		// '東帝汶Q574.geojson',
		// '柬埔寨Q424.geojson',
		// '格瑞那達Q769.geojson',
		// '梵蒂岡城國Q237.geojson',
		// '比利時Q31.geojson',
		// '毛里塔尼亞Q1025.geojson',
		// '毛里求斯Q1027.geojson',
		// '汶莱Q921.geojson',
		// '沙特阿拉伯Q851.geojson',
		// '法國Q142.geojson',
		// '波札那Q963.geojson',
		// '波蘭Q36.geojson',
		// '泰國Q869.geojson',
		// '津巴布韦Q954.geojson',
		// '洪都拉斯Q783.geojson',
		// '澳大利亚Q408.geojson',
		// '烏干達Q1036.geojson',
		// '烏拉圭Q77.geojson',
		// '牙買加Q766.geojson',
		// '玻利維亞Q750.geojson',
		// '瑙鲁Q697.geojson',
		// '瑞典Q34.geojson',
		// '瑞士Q39.geojson',
		// '畿內亞比紹Q1007.geojson',
		// '白俄羅斯Q184.geojson',
		// '科特迪瓦Q1008.geojson',
		// '科索沃Q1246.geojson',
		// '秘鲁Q419.geojson',
		// '突尼西亞Q948.geojson',
		// '立陶宛Q37.geojson',
		// '約旦Q810.geojson',
		// '紐埃Q34020.geojson',
		// '索馬里Q1045.geojson',
		// '緬甸Q836.geojson',
		// '纳米比亚Q1030.geojson',
		// '羅馬尼亞Q218.geojson',
		// '老撾Q819.geojson',
		// '聖克里斯多福及尼維斯Q763.geojson',
		// '肯尼亚Q114.geojson',
		// '芬蘭Q33.geojson',
		// '苏丹Q1049.geojson',
		// '荷兰王国Q29999.geojson',
		// '荷屬聖馬丁Q26273.geojson',
		// '荷蘭Q55.geojson',
		// '莫桑比克Q1029.geojson',
		// '莱索托Q1013.geojson',
		// '菲律賓Q928.geojson',
		// '萨摩亚Q683.geojson',
		// '萬那杜Q686.geojson',
		// '葛摩Q970.geojson',
		// '葡萄牙Q45.geojson',
		// '蒙古國Q711.geojson',
		// '蒙特內哥羅Q236.geojson',
		// '蒲隆地Q967.geojson',
		// '薩爾瓦多Q792.geojson',
		// '西班牙Q29.geojson',
		// '貝南Q962.geojson',
		// '贊比亞Q953.geojson',
		// '越南Q881.geojson',
		// '迦納Q117.geojson',
		// '钦兰邦Q124153644.geojson',
		// '阿塞拜疆Q227.geojson',
		// '阿富汗Q889.geojson',
		// '阿拉伯联合酋长国Q878.geojson',
		// '阿曼Q842.geojson',
		// '阿根廷Q414.geojson',
		// '阿爾及利亞Q262.geojson',
		// '阿爾巴尼亞Q222.geojson',
		// '阿魯巴Q21203.geojson',
		// '馬來西亞Q833.geojson',
		// '馬拉威Q1020.geojson',
		// '馬爾代夫Q826.geojson',
		// '馬耳他Q233.geojson',
		// '馬達加斯加Q1019.geojson',
		// '马里Q912.geojson',
		// '黎巴嫩Q822.geojson',
	]

	earthAreas.forEach(async (areaJsonData) => {
		const dataSource = await Cesium.GeoJsonDataSource.load(
			`http://localhost:8082/nj-map-data/${areaJsonData}`,
		)
		viewer.dataSources.add(dataSource)
		const entities = dataSource.entities.values
		for (const entity of entities) {
			if (entity.polygon) {
				entity.polygon.material = new Cesium.ColorMaterialProperty(
					Cesium.Color.fromCssColorString('#2b466e90'),
				)

				entity.polygon.height = new Cesium.ConstantProperty(1)
				entity.polygon.outline = new Cesium.ConstantProperty(true)
				entity.polygon.outlineColor = new Cesium.ConstantProperty(
					Cesium.Color.fromCssColorString('#ffffff90'),
				)

				// const positions = (entity.polygon.hierarchy as any)._value.positions;
				// viewer.entities.add({
				//   polyline: {
				// 		positions: positions,
				// 		width: 4.0,
				// 		material: new Cesium.PolylineGlowMaterialProperty({
				// 			color: Cesium.Color.fromCssColorString('#ffffff90'),
				// 			glowPower: 0.25,
				// 		}),
				// 		// material: new Cesium.PolylineOutlineMaterialProperty ({
				//     //   color: Cesium.Color.fromCssColorString('#ffffff90'),
				//     // }),
				// 	},
				// });
			}
		}
		return dataSource
	})
}

const zoomThreshold = 15000000 // 根据需要调整
export function updateChinaAreaVisibility(viewer: Cesium.Viewer) {
	const camera = viewer.scene.camera
	const cameraPosition = camera.positionCartographic
	// 计算相机到地球表面的距离
	const surfaceDistance = Cesium.Cartesian3.distance(
		camera.positionWC,
		Cesium.Cartesian3.fromDegrees(
			cameraPosition.longitude,
			cameraPosition.latitude,
			0,
		),
	)
	// 根据距离决定是否显示
	if (chinaAreaPolygon) {
		chinaAreaPolygon.show = surfaceDistance > zoomThreshold
	}
}
