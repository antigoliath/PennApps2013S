function update_hierarchy(project)
{
	Joint.resetPaper()
	var _classes = (project.classes).concat(project.interfaces)
	var boxes = []

	var org = Joint.dia.org

	console.log(org)
	var world_paper = Joint.paper(document.getElementById("canvas"));

	var extensions = []
	var implementations = []
	var _ids = []
	var x_dists = []

	for(var x in _classes)
	{
		var detail_string = ""
		if(project.classes.indexOf(_classes[x]) != -1)
		{
			detail_string = "Class"
		}
		else if(project.interfaces.indexOf(_classes[x]) != -1)
		{
			detail_string = "Interface"
		}

		var depth = 0
		var temp = _classes[x]

		for(var _inter in temp.interfaces)
		{
			for(var _cl in _classes)
			{
				if(_classes[_cl].name == temp.interfaces[_inter])
				{
					implementations.push([x, _cl])
				}
			}
		}

		while(temp.parents && temp.parents[0])
		{
			for(var par in temp.parents)
			{
				for(var _cl in _classes)
				{
					if(_classes[_cl].name == temp.parents[par])
					{
						extensions.push([x, _cl])
					}
				}
			}
			depth += 1
			temp = temp.parents[0]
		}
		var _fill = "red"

		if(depth > 0)
		{
			_fill = "orange"
		}
		else if(depth > 1)
		{
			_fill = "yellow"
		}
		else if(depth > 2)
		{
			_fill = "green"
		}
		else if(depth > 3)
		{
			_fill = "blue"
		}

		var x_dist = Math.random()*(world_paper.width-200)+50
		var looper = true
		while(looper)
		{
			for(var number in x_dists)
			{
				if(Math.abs(x_dists[number] - x_dist) < 140)
				{
					x_dist = Math.random()*(world_paper.width-200)+50;
					break;
				}
			}
			looper = false
		}

		var box = org.Member.create({
			rect: {x: x_dist, y: (world_paper.height/4)*depth, width: 140, height: 60},
			name: _classes[x].name,
			position: detail_string,
			attrs: {fill : _fill, stroke:'gray'}
		});
		x_dists.push(x_dist)

		box.draggable(false);

		_ids.push(_classes[x].id)
		box.wrapper.click(function(){
			loadClassDetail(_ids[boxes.indexOf(this)]);
		});

		boxes.push(box.wrapper)
	}
	for(var conn in extensions)
	{
		var tuple = extensions[conn]
		boxes[tuple[0]].joint(boxes[tuple[1]], {
			label: "extends",
			beSmooth: "true",
			startArrow: {
				type: "none",
				size: 7,
				attrs: {
					fill: "red",
					stroke: "black"
				}
			},
			endArrow: {
				type: "basic",
				size: 7,
				attrs: {
					fill: "red",
					stroke: "black"
				}
			}
		});
	}
	for(var conn in implementations)
	{
		var tuple = implementations[conn]
		boxes[tuple[0]].joint(boxes[tuple[1]], {
			label: "implements",
			beSmooth: "true",
			startArrow: {
				type: "none",
				size: 7,
				attrs: {
					fill: "gray",
					stroke: "blue"
				}
			},
			endArrow: {
				type: "basic",
				size: 7,
				attrs: {
					fill: "gray",
					stroke: "blue"
				}
			}
		});
	}
}